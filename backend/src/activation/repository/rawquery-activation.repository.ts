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
      host: this.configService.get<string>('database.host'),
      user: this.configService.get<string>('database.username'),
      port: this.configService.get<number>('database.port'),
      password:this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      bigIntAsNumber: true,
    });
  }

  async getInactivatedCabinetList(): Promise<InactivatedCabinetDto[]> {
    const connection = await this.pool.getConnection();
    const content = `
      SELECT c.floor, c.cabinet_num, c.memo as note
      FROM cabinet c
      WHERE c.cabinet_status='BROKEN';
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
      WHERE c.cabinet_status='BANNED';
    `;
    const result = await connection.query(content);
    connection.release();
    return result;
  }

  // FIXME: activation 대신 cabinet_status와 lent_type을 변경하도록 기능이 변경되었지만
  // 일단 v3로의 포팅에서는 activation 대신 cabinet_status로 대체하도록 하겠습니다.
  async modifyCabinetActivation(
    connection: any,
    cabinetIdx: number,
    activation: number,
  ) {
    const content = `
      UPDATE cabinet c
      SET cabinet_status=?
      WHERE cabinet_id= ?
      `;
    let status = 'AVAILABLE';
    if (activation === 0) {
      status = 'BANNED';
    };
    await connection.query(content, [status, cabinetIdx]);
  }

  // disable 테이블 대신 cabinet.memo에 저장
  async addDisableLog(connection: any, cabinetIdx: number, reason: string) {
    const content = `
      UPDATE cabinet c
      SET memo=?
      WHERE cabinet_id=?
      `;
    await connection.query(content, [reason, cabinetIdx]);
  }

  // disable 테이블 대신 cabinet.memo에 저장하므로 addDisableLog와 동일
  async modifyDisableLog(
    connection: any,
    cabinetIdx: number,
    activation: number,
  ) {
    let status = 'AVAILABLE';
    if (activation === 0) {
      status = 'BANNED';
    };
    const content = `
      UPDATE cabinet c
      SET cabinet_status= ?
      WHERE cabinet_id= ?
      `;
    await connection.query(content, [status, cabinetIdx]);
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
