import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import LentLog from 'src/entities/lent.log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LogRepository } from './repository/log.repository';

const repo = {
  provide: 'ILogRepository',
  useClass: LogRepository,
};

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([LentLog])],
  exports: [LogService],
  controllers: [LogController],
  providers: [LogService, repo],
})
export class LogModule {}
