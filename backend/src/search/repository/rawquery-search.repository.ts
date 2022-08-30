import * as mariadb from 'mariadb';
import { ISearchRepository } from './ISearchRepository';
import { LentLogDto } from '../dto/search-lentlog.dto';
import { LentDto } from '../dto/search-lent.dto';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class RawquerySearchRepository implements ISearchRepository {
  private pool;

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.pool = mariadb.createPool({
      host: this.configService.get<string>('database.host'),
      user: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      bigIntAsNumber: true,
    });
  }

  // 검색 BY intraId FROM lent
  async getLentByIntraId(intraId: string): Promise<LentDto[]> {
    const connection = await this.pool.getConnection();
    const lentInfo = [];

    const content = `
    SELECT u.intra_id, u.auth, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
    FROM user u
    LEFT JOIN lent l
    ON u.user_id=l.lent_user_id
    LEFT JOIN cabinet c
    ON l.lent_cabinet_id=c.cabinet_id
    WHERE u.intra_id = ? ;
    `;
    const getLentInfoByIntraId = await connection.query(content, intraId);

    for (let i = 0; i < getLentInfoByIntraId.length; i += 1) {
      lentInfo.push({
        intra_id: getLentInfoByIntraId[i].intra_id,
        auth: getLentInfoByIntraId[i].auth,
        cabinet_id: getLentInfoByIntraId[i].cabinet_id,
        cabinet_num: getLentInfoByIntraId[i].cabinet_num,
        location: getLentInfoByIntraId[i].location,
        section: getLentInfoByIntraId[i].section,
        floor: getLentInfoByIntraId[i].floor,
        activation: getLentInfoByIntraId[i].activation,
        lent_id: getLentInfoByIntraId[i].lent_id,
        lent_time: getLentInfoByIntraId[i].lent_time,
        expire_time: getLentInfoByIntraId[i].expire_time,
      });
    }
    connection.release();
    return lentInfo;
  }

  // 검색 BY intraId FROM lent_log
  async getLentLogByIntraId(intraId: string): Promise<LentLogDto[]> {
    const connection = await this.pool.getConnection();
    const lentLogInfo = [];

    const content = `
    SELECT u.intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
    FROM user u
    LEFT JOIN lent_log ll
    ON u.user_id=ll.log_user_id
    LEFT JOIN cabinet c
    ON ll.log_cabinet_id=c.cabinet_id
    WHERE u.intra_id = ?
    ORDER BY lent_time DESC 
    LIMIT 10;
    `;
    const getLentLogByIntraId = await connection.query(content, intraId);

    for (let i = 0; i < getLentLogByIntraId.length; i += 1) {
      lentLogInfo.push({
        intra_id: getLentLogByIntraId[i].intra_id,
        cabinet_id: getLentLogByIntraId[i].cabinet_id,
        cabinet_num: getLentLogByIntraId[i].cabinet_num,
        location: getLentLogByIntraId[i].location,
        section: getLentLogByIntraId[i].section,
        floor: getLentLogByIntraId[i].floor,
        activation: getLentLogByIntraId[i].activation,
        log_id: getLentLogByIntraId[i].log_id,
        lent_time: getLentLogByIntraId[i].lent_time,
        return_time: getLentLogByIntraId[i].return_time,
      });
    }
    connection.release();
    return lentLogInfo;
  }

  // 검색 BY 사물함 번호 FROM lent
  async getLentByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentDto[]> {
    const connection = await this.pool.getConnection();
    const lentInfo = [];

    const content = `
    SELECT (select intra_id from user u where u.user_id=l.lent_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
    FROM cabinet c
    LEFT JOIN lent l
    ON c.cabinet_id=l.lent_cabinet_id
    WHERE c.cabinet_num = ? AND c.floor = ?;
    `;
    const getLentByCabinetNum = await connection.query(content, [
      cabinetNum,
      floor,
    ]);

    for (let i = 0; i < getLentByCabinetNum.length; i += 1) {
      lentInfo.push({
        intra_id: getLentByCabinetNum[i].intra_id,
        cabinet_id: getLentByCabinetNum[i].cabinet_id,
        cabinet_num: getLentByCabinetNum[i].cabinet_num,
        location: getLentByCabinetNum[i].location,
        section: getLentByCabinetNum[i].section,
        floor: getLentByCabinetNum[i].floor,
        activation: getLentByCabinetNum[i].activation,
        lent_id: getLentByCabinetNum[i].lent_id,
        log_id: getLentByCabinetNum[i].log_id,
        lent_time: getLentByCabinetNum[i].lent_time,
        expire_time: getLentByCabinetNum[i].expire_time,
      });
    }
    connection.release();
    return lentInfo;
  }

  // 검색 BY 사물함 번호 FROM lent_log
  async getLentLogByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentLogDto[]> {
    const connection = await this.pool.getConnection();
    const lentLogInfo = [];
    const content = `
    SELECT (select intra_id from user u where u.user_id=ll.log_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
    FROM cabinet c
    LEFT JOIN lent_log ll
    ON c.cabinet_id=ll.log_cabinet_id
    WHERE c.cabinet_num = ? AND c.floor = ?
    ORDER BY lent_time DESC
    LIMIT 10;
    `;
    const getLentLogByCabinetNum = await connection.query(content, [
      cabinetNum,
      floor,
    ]);

    for (let i = 0; i < getLentLogByCabinetNum.length; i += 1) {
      lentLogInfo.push({
        intra_id: getLentLogByCabinetNum[i].intra_id,
        cabinet_id: getLentLogByCabinetNum[i].cabinet_id,
        cabinet_num: getLentLogByCabinetNum[i].cabinet_num,
        location: getLentLogByCabinetNum[i].location,
        section: getLentLogByCabinetNum[i].section,
        floor: getLentLogByCabinetNum[i].floor,
        activation: getLentLogByCabinetNum[i].activation,
        lent_id: getLentLogByCabinetNum[i].lent_id,
        log_id: getLentLogByCabinetNum[i].log_id,
        lent_time: getLentLogByCabinetNum[i].lent_time,
        return_time: getLentLogByCabinetNum[i].return_time,
      });
    }
    connection.release();
    return lentLogInfo;
  }
}
