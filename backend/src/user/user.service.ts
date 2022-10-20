import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { BlockedUserDto } from './dto/blocked-user.dto';
import { IUserRepository } from './repository/user.interface.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async getBanUser(): Promise<BlockedUserDto[]> {
    return await this.userRepository.getBanUser();
  }
}
