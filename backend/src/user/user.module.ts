import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BanLog from 'src/entities/ban.log.entity';
import User from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

const repo = {
  provide: 'IUserRepository',
  useClass: UserRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([User, BanLog])],
  providers: [UserService, repo],
  exports: [UserService],
})
export class UserModule {}
