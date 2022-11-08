import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';
import { LentModule } from './lent/lent.module';
import { LogModule } from './log/log.module';
import { ReturnModule } from './return/return.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    CabinetModule,
    LentModule,
    ReturnModule,
    SearchModule,
    UserModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class V3Module {}
