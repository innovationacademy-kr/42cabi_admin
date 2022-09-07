import { LentInfoDto } from '../dto/lent-info.dto';
import { ILentRepository } from './ILentRepository';
import * as mariadb from 'mariadb';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OverdueInfoDto } from '../dto/overdue-info.dto';

export class RawqueryLentRepository implements ILentRepository {
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

  async getLentInfo(): Promise<LentInfoDto[]> {
    const connection = await this.pool.getConnection();
    const lentInfo = [];

    const content = `SELECT u.intra_id, l.*
    FROM user u
    RIGHT JOIN lent l
    ON l.lent_user_id=u.user_id
    `;

    const lockerRentalUser = await connection.query(content);

    for (let i = 0; i < lockerRentalUser.length; i += 1) {
      lentInfo.push({
        lent_id: lockerRentalUser[i].lent_id,
        lent_cabinet_id: lockerRentalUser[i].lent_cabinet_id,
        lent_user_id: lockerRentalUser[i].lent_user_id,
        lent_time: lockerRentalUser[i].lent_time,
        expire_time: lockerRentalUser[i].expire_time,
        extension: lockerRentalUser[i].extension,
        intra_id: lockerRentalUser[i].intra_id,
      });
    }
    connection.release();
    return lentInfo;
  }

  async getLentOverdue(): Promise<OverdueInfoDto[]> {
    const connection = await this.pool.getConnection();

    const content = `
      SELECT u.intra_id, c.floor, c.cabinet_num, l.lent_time,l.expire_time from lent l
      JOIN cabinet c
      ON c.cabinet_id = l.lent_cabinet_id
      JOIN user u
      ON u.user_id = l.lent_user_id
      where l.expire_time < DATE_FORMAT(NOW(), '%Y-%m-%d')
      ORDER BY l.expire_time;
    `;

    const results = await connection.query(content);
    connection.release();

    return results.map((result) => ({
      intra_id: result.intra_id,
      floor: result.floor,
      cabinet_num: result.cabinet_num,
      lent_time: result.lent_time,
      expire_time: result.expire_time,
    }));
  }
}
