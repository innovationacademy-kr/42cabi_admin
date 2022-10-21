import { ConfigService } from '@nestjs/config';
import * as mariadb from 'mariadb';
import { Inject } from '@nestjs/common';
import { CabinetLentDto } from '../dto/cabinet-lent.dto';
import { CabinetDto } from '../dto/cabinet.dto';
import { IReturnRepository } from './return.repository.interface';

export class RawqueryReturnRepository implements IReturnRepository {
  private pool;

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.pool = mariadb.createPool({
      host: this.configService.get<string>('database.host'),
      user: this.configService.get<string>('database.username'),
      port: this.configService.get<number>('database.port'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      bigIntAsNumber: true,
    });
  }

  async getCabinet(cabinetIdx: number): Promise<CabinetDto> {
    const connection = await this.pool.getConnection();
    const query = `
      SELECT *
      FROM cabinet c
      LEFT JOIN lent l ON c.cabinet_id=l.lent_cabinet_id
      LEFT JOIN user u ON l.lent_user_id=u.user_id
      WHERE c.cabinet_id = ?;
    `;
    const [result] = await connection.query(query, cabinetIdx);
    connection.release();
    const rtn = {
      cabinet_id: result.cabinet_id,
      cabinet_num: result.cabinet_num,
      location: result.location,
      floor: result.floor,
      section: result.section,
      activation: result.cabinet_status !== 'BROKEN' ? 0 : 1,
      lent_id: result.lent_id,
      lent_cabinet_id: result.lent_cabinet_id,
      lent_user_id: result.lent_user_id,
      lent_time: result.lent_time,
      expire_time: result.expire_time,
      extension: 0, //  NOTE: 무슨 필드?
      user_id: result.user_id,
      intra_id: result.intra_id,
      auth: 0, //  NOTE: 무슨 필드?
      email: result.email,
      phone: '010-123-4567', //  NOTE: 삭제 필요
      firstLogin: result.first_login,
      lastLogin: result.last_login,
    };
    return rtn;
  }

  async returnCabinet(cabinetIdx: number): Promise<boolean> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      // 해당 사물함의 user, lent 정보 가져옴
      const userLentInfo = await this.getUserLent(connection, cabinetIdx);
      if (!userLentInfo) {
        return false;
      }

      // lent 테이블에서 해당 사물함의 대여 정보 삭제
      await this.deleteLent(connection, userLentInfo.lent_cabinet_id);

      // lent_log에 반납되는 사물함 정보 추가
      await this.addLentLog(connection, Object.values(userLentInfo));

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      return false;
    } finally {
      connection.release();
    }
  }

  async getUserLent(
    connection: any,
    cabinetIdx: number,
  ): Promise<CabinetLentDto | null> {
    const query = `
      SELECT lent_cabinet_id, lent_user_id, DATE_FORMAT(lent_time, '%Y-%m-%d %H:%i:%s') AS lent_time
      FROM lent
      WHERE lent_cabinet_id = ?
    `;
    const [result] = await connection.query(query, cabinetIdx);
    return result;
  }

  async deleteLent(connection: any, cabinetIdx: number): Promise<void> {
    const query = `
      DELETE
      FROM lent
      WHERE lent_cabinet_id= ?
    `;
    await connection.query(query, cabinetIdx);
  }

  // FIXME: 추후에 cabinetLentDto에 log_intra_id도 들어와야 함...
  async addLentLog(connection: any, cabinetLentDto: any[]): Promise<void> {
    const query = `
      INSERT INTO lent_log(log_cabinet_id, log_intra_id, log_user_id, lent_time, return_time)
      VALUES ( ?, 'mock_id', ?, ?, now())
    `;
    connection.query(query, cabinetLentDto);
  }
}
