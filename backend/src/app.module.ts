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
import { V3Module } from './v3/v3.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // TODO: remove after
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('No options');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
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
    V3Module,
  ],
})
export class AppModule {}
