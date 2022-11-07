import { Inject, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ReturnService } from 'src/return/return.service';
import { UserDto } from './dto/user.dto';
import { IUserRepository } from './repository/user.repository.interface';

@Injectable()
export class UserService {
  private logger = new Logger(ReturnService.name);

  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async getUserIfExist(user_id: number): Promise<UserDto> {
    this.logger.debug(`Called ${UserService.name} ${this.getUserIfExist.name}`);
    return await this.userRepository.getUserIfExist(user_id);
  }
}
