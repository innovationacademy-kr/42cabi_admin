import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';
import { ReturnModule } from './return/return.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CabinetModule, ReturnModule, SearchModule, UserModule],
  controllers: [],
  providers: [],
})
export class V3Module {}
