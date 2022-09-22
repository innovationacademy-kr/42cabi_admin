import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LentController } from './lent.controller';
import { LentService } from './lent.service';
import { ILentRepository } from './repository/ILentRepository';
import { RawqueryLentRepository } from './repository/rawquery-cabinet.repository';

const repo = {
  provide: ILentRepository,
  useClass: RawqueryLentRepository,
};

@Module({
  controllers: [LentController],
  providers: [LentService, repo],
  imports: [AuthModule], // for JWTAuthGuard
})
export class LentModule {}
