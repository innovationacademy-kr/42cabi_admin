import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Cabinet from 'src/entities/cabinet.entity';
import { ReturnRepository } from './repository/return.repository';
import { ReturnController } from './return.controller';
import { ReturnService } from './return.service';

const repo = {
  provide: 'IReturnRepository',
  useClass: ReturnRepository,
};

@Module({
  controllers: [ReturnController],
  providers: [ReturnService, repo],
  imports: [AuthModule, TypeOrmModule.forFeature([Cabinet])], // for JWTAuthGuard
})
export class ReturnModule {}
