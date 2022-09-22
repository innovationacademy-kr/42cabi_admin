import { Module } from '@nestjs/common';
import { RawqueryUserRepository } from './repository/rawquery-user.repository';
import { IUserRepository } from './repository/user.repository';
import { UserService } from './user.service';

const repo = {
  provide: IUserRepository,
  useClass: RawqueryUserRepository,
};

@Module({
  providers: [UserService, repo],
  exports: [UserService],
})
export class UserModule {}
