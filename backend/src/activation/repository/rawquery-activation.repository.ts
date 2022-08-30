import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IActivationRepository } from './IActivationRepository';
import * as mariadb from 'mariadb';
import { InactivatedCabinetDto } from '../dto/inactivated-cabinet.dto';
import { BanCabinetDto } from '../dto/ban-cabinet.dto';
import { PatchActivationDto } from '../dto/patch-activation.dto';

export class RawqueryActivationRepository implements IActivationRepository {
  private pool;

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.pool = mariadb.createPool({
      host: configService.get<string>('database.host'),
      user: configService.get<string>('database.username'),
      password: configService.get<string>('database.password'),
      database: configService.get<string>('database.database'),
      bigIntAsNumber: true,
    });
  }

  async getInactivatedCabinetList(): Promise<InactivatedCabinetDto[]> {
    const connection = await this.pool.getConnection();
    const content = `
        SELECT c.floor, c.cabinet_num, d.note
        FROM cabinet c
        JOIN disable d
        ON d.disable_cabinet_id = c.cabinet_id AND d.status = 1
        WHERE c.activation=0;
    `;
    const result = await connection.query(content);
    connection.release();
    return result;
  }

  async getBanCabinetList(): Promise<BanCabinetDto[]> {
    const connection = await this.pool.getConnection();
    const content = `
      SELECT c.floor, c.section, c.cabinet_num
      FROM cabinet c
      WHERE c.activation=2;
    `;
    const result = await connection.query(content);
    connection.release();
    return result;
  }

  async modifyCabinetActivation(
    connection: any,
    cabinetIdx: number,
    activation: number,
  ) {
    const content = `
      UPDATE cabinet c
      SET activation= ?
      WHERE cabinet_id= ?
      `;
    await connection.query(content, [activation, cabinetIdx]);
  }

  async addDisableLog(connection: any, cabinetIdx: number, reason: string) {
    const content = `
      INSERT INTO disable (disable_cabinet_id, note)
      VALUES (?, ?);
    `;
    await connection.query(content, [cabinetIdx, reason]);
  }

  async modifyDisableLog(
    connection: any,
    cabinetIdx: number,
    activation: number,
  ) {
    const content = `
      UPDATE cabinet c
      SET activation= ?
      WHERE cabinet_id= ?
      `;
    await connection.query(content, [activation, cabinetIdx]);
  }

  async patchActivation(cabinetInfo: PatchActivationDto): Promise<boolean> {
    const connection = await this.pool.getConnection();
    try {
      connection.beginTransaction();

      await this.modifyCabinetActivation(
        connection,
        cabinetInfo.cabinetIdx,
        cabinetInfo.activation,
      );

      if (cabinetInfo.activation === 0)
        await this.addDisableLog(
          connection,
          cabinetInfo.cabinetIdx,
          cabinetInfo.reason,
        );
      else
        await this.modifyDisableLog(
          connection,
          cabinetInfo.cabinetIdx,
          cabinetInfo.activation,
        );

      connection.commit();
      return true;
    } catch (err) {
      connection.rollback();
      console.log(err);
      return false;
    } finally {
      connection.release();
    }
  }
}
