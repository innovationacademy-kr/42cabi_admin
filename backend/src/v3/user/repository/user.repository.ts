import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { UserDto } from 'src/v3/user/dto/user.dto';
import { Repository } from 'typeorm';
import { IUserRepository } from './user.repository.interface';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserIfExist(user_id: number): Promise<UserDto> {
    const result = await this.userRepository.findOne({
      where: {
        user_id: user_id,
      }
    })
    if (!result) {
      return null;
    }
    return {
      user_id: result.user_id,
      intra_id: result.intra_id,
    };
  }
}
