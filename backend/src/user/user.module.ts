import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

const repo = {
  provide: 'IUserRepository',
  useClass: UserRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, repo],
  exports: [UserService],
})
export class UserModule {}
