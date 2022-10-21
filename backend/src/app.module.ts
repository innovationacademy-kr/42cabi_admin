import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ActivationModule } from './activation/activation.module';
import { AuthModule } from './auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';
import configuration from './config/configuration';
import { LentModule } from './lent/lent.module';
import { ReturnModule } from './return/return.module';
import { SearchModule } from './search/search.module';
import { join } from 'path';
import TypeOrmConfigService from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // TODO: remove after
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ActivationModule,
    AuthModule,
    CabinetModule,
    LentModule,
    ReturnModule,
    SearchModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend/build/'),
      serveRoot: '',
    }),
  ],
})
export class AppModule {}
