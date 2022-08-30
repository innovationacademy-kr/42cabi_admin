import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CabinetController } from './cabinet.controller';
import { CabinetService } from './cabinet.service';
import { ICabinetRepository } from './repository/ICabinetRepository';
import { RawqueryCabinetRepository } from './repository/rawquery-cabinet.repository';

const repo = {
  provide: ICabinetRepository,
  useClass: RawqueryCabinetRepository,
};

@Module({
  controllers: [CabinetController],
  providers: [CabinetService, repo],
  imports: [AuthModule], // for JWTAuthGuard
})
export class CabinetModule {}
