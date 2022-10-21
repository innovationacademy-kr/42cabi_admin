import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { BlockedUserDto } from '../dto/blocked-user.dto';
import { Repository } from 'typeorm';
import { IUserRepository } from './user.repository.interface';
import BanLog from 'src/entities/ban.log.entity';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getBanUser(): Promise<BlockedUserDto[]> {
    const result = await this.userRepository
      .createQueryBuilder('u')
      .addSelect('MAX(b.unbanned_date)', 'unbanned_date')
      .innerJoinAndSelect(BanLog, 'b', 'b.ban_user_id=u.user_id')
      .where("b.unbanned_date > DATE_FORMAT(NOW(), '%Y-%m-%d')")
      .groupBy('u.intra_id')
      .orderBy('unbanned_date', 'DESC')
      .execute();

    return result.map((field) => ({
      intra_id: field.u_intra_id,
      bannedDate: field.b_banned_date,
    }));
  }
}
