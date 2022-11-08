import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Cabinet from 'src/entities/cabinet.entity';
import Lent from 'src/entities/lent.entity';
import LentLog from 'src/entities/lent.log.entity';
import { BanModule } from '../ban/ban.module';
import { CabinetModule } from '../cabinet/cabinet.module';
import { LentModule } from '../lent/lent.module';
import { UserModule } from '../user/user.module';
import { ReturnRepository } from './repository/return.repository';
import { ReturnTools } from './return.component';
import { ReturnController } from './return.controller';
import { ReturnService } from './return.service';

const repo = {
  provide: 'IReturnRepository',
  useClass: ReturnRepository,
};

@Module({
  controllers: [ReturnController],
  providers: [ReturnService, ReturnTools, repo],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Cabinet, Lent, LentLog]),
    CabinetModule,
    LentModule,
    BanModule,
    UserModule,
  ], // for JWTAuthGuard
})
export class ReturnModule {}
