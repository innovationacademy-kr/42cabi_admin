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
      COUNT(case when c.cabinet_id=l.lent_cabinet_id and l.expire_time>=DATE_FORMAT(NOW(), '%Y-%m-%d') then 1 end) as used,
      COUNT(case when l.expire_time<DATE_FORMAT(NOW(), '%Y-%m-%d') then 1 end) as overdue,
      COUNT(case when l.lent_cabinet_id is null and c.activation=1 then 1 end) as unused,
      COUNT(case when c.activation!=1 then 1 end) as disabled
      FROM cabinet c
      LEFT JOIN lent l
      ON c.cabinet_id=l.lent_cabinet_id
      group by floor;
    `;
    const result = await connection.query(content);
    connection.release();
    return result;
  }
}
