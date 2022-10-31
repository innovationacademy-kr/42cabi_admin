import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './repository/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}
}
