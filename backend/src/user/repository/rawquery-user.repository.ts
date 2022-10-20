import * as mariadb from 'mariadb';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockedUserDto } from '../dto/blocked-user.dto';
import { IUserRepository } from './user.repository.interface';

export class RawqueryUserRepository implements IUserRepository {
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

  async getBanUser(): Promise<BlockedUserDto[]> {
    const connection = await this.pool.getConnection();

    const content = `
      SELECT u.intra_id, b.banned_date, MAX(b.unbanned_date) as unbanned_date
      FROM user u join ban_log b on b.ban_user_id=u.user_id
      where b.unbanned_date > DATE_FORMAT(NOW(), '%Y-%m-%d')
      GROUP BY u.intra_id
      order by unbanned_date DESC
    `;

    const result = await connection.query(content);
    connection.release();
    return result.map((field) => ({
      intra_id: field.intra_id,
      bannedDate: field.bannedDate,
    }));
  }
}
