import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Lent from 'src/entities/lent.entity';
import { LentController } from './lent.controller';
import { LentService } from './lent.service';
import { LentRepository } from './repository/lent.repository';

const repo = {
  provide: 'ILentRepository',
  useClass: LentRepository,
};

@Module({
  controllers: [LentController],
  providers: [LentService, repo],
  imports: [AuthModule, TypeOrmModule.forFeature([Lent])], // for JWTAuthGuard
})
export class LentModule {}
