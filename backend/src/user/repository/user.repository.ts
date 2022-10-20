import { InjectRepository } from "@nestjs/typeorm";
import User from "src/entities/user.entity";
import { Repository } from 'typeorm';
import { BlockedUserDto } from "../dto/blocked-user.dto";
import { IUserRepository } from "./user.interface.repository";

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getBanUser(): Promise<BlockedUserDto[]> {
	const result = await this.userRepository.createQueryBuilder(this.getBanUser.name)
	.select('u.intra_id', 'intra_id')
	.addSelect('bl.banned_date', 'banned_date')
	.addSelect('MAX(bl.unbanned_date)', 'unbanned_date')
	.from('user', 'u')
	.leftJoin('ban_log', 'bl', 'bl.ban_user_id=u.user_id')
	.where("bl.unbanned_date > DATE_FORMAT(NOW(), '%Y-%m-%d')")
	.groupBy('u.intra_id')
	.orderBy('unbanned_date', 'DESC')
	.getRawMany();
	return result;
  }
}
