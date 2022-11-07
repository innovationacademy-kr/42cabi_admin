import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import BanLog from 'src/entities/ban.log.entity';
import Cabinet from 'src/entities/cabinet.entity';
import User from 'src/entities/user.entity';
import { SearchRepository } from './repository/search.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

const repo = {
  provide: 'ISearchRepository',
  useClass: SearchRepository,
};

@Module({
  controllers: [SearchController],
  providers: [SearchService, repo],
  imports: [AuthModule, TypeOrmModule.forFeature([User, Cabinet, BanLog])],
})
export class SearchModule {}
