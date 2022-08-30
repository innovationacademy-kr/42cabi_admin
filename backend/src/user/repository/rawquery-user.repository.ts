import * as mariadb from 'mariadb';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from './user.repository';
import { BlockedUserDto } from '../dto/blocked-user.dto';

export class RawqueryUserRepository implements IUserRepository {
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

  async getBanUser(): Promise<BlockedUserDto[]> {
    const connection = await this.pool.getConnection();

    const content = `
      SELECT u.intra_id, b.bannedDate
      FROM user u join ban_user b on b.user_id=u.user_id
      where u.auth=1;
    `;

    const result = await connection.query(content);
    connection.release();
    return result.map((field) => ({
      intra_id: field.intra_id,
      bannedDate: field.bannedDate,
    }));
  }
}
