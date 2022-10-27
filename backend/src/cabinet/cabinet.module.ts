import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Cabinet from 'src/entities/cabinet.entity';
import { CabinetController } from './cabinet.controller';
import { CabinetService } from './cabinet.service';
import { CabinetRepository } from './repository/cabinet.repository';

const repo = {
  provide: 'ICabinetRepository',
  useClass: CabinetRepository,
};

@Module({
  controllers: [CabinetController],
  providers: [CabinetService, repo],
  exports: [CabinetService],
  imports: [AuthModule, TypeOrmModule.forFeature([Cabinet])], // for JWTAuthGuard
})
export class CabinetModule {}
