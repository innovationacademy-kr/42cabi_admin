import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ActivationController } from './activation.controller';
import { ActivationService } from './activation.service';
import { IActivationRepository } from './repository/IActivationRepository';
import { RawqueryActivationRepository } from './repository/rawquery-activation.repository';

const repo = {
  provide: IActivationRepository,
  useClass: RawqueryActivationRepository,
};

@Module({
  controllers: [ActivationController],
  providers: [ActivationService, repo],
  imports: [AuthModule], // for JWTAuthGuard
})
export class ActivationModule {}
