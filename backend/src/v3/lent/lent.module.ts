import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Cabinet from 'src/entities/cabinet.entity';
import Lent from 'src/entities/lent.entity';
import User from 'src/entities/user.entity';
import { LentTools } from './lent.component';
import { LentController } from './lent.controller';
import { LentService } from './lent.service';
import { LentRepository } from './repository/lent.repository';

const repo = {
  provide: 'ILentRepository',
  useClass: LentRepository,
};

@Module({
  controllers: [LentController],
  providers: [LentService, repo, LentTools],
  imports: [AuthModule, TypeOrmModule.forFeature([Lent, User, Cabinet])], // for JWTAuthGuard
  exports: [LentTools],
})
export class LentModule {}
