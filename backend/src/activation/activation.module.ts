import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Cabinet from 'src/entities/cabinet.entity';
import { ActivationController } from './activation.controller';
import { ActivationService } from './activation.service';
import { ActivationRepository } from './repository/activation.repository';

const repo = {
  provide: 'IActivationRepository',
  useClass: ActivationRepository,
};

@Module({
  controllers: [ActivationController],
  providers: [ActivationService, repo],
  imports: [AuthModule, TypeOrmModule.forFeature([Cabinet])], // for JWTAuthGuard
})
export class ActivationModule {}
