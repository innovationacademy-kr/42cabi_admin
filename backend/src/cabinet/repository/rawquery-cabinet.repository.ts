import { CabinetFloorDto } from '../dto/cabinet-floor.dto';
import { ICabinetRepository } from './ICabinetRepository';
import * as mariadb from 'mariadb';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class RawqueryCabinetRepository implements ICabinetRepository {
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

  async findAll(): Promise<CabinetFloorDto[]> {
    const connection = await this.pool.getConnection();
    const content = `
      SELECT c.floor,
      COUNT(*) as total,
      COUNT(case when c.cabinet_status='SET_EXPIRE_FULL' then 1 end) as used,
      COUNT(case when c.cabinet_status='EXPIRED' then 1 end) as overdue,
      COUNT(case when c.cabinet_status LIKE '%AVAILABLE%' then 1 end) as unused,
      COUNT(case when c.cabinet_status='BROKEN' or c.cabinet_status='BANNED' then 1 end) as disabled
      FROM cabinet c
      group by floor;
    `;
    const result = await connection.query(content);
    connection.release();
    return result;
  }
}
