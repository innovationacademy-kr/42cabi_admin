import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { BlockedUserDto } from './dto/blocked-user.dto';
import { IUserRepository } from './repository/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async getBanUser(): Promise<BlockedUserDto[]> {
    return this.userRepository.getBanUser();
  }
}
