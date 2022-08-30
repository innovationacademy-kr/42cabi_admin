import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ISearchRepository } from './repository/ISearchRepository';
import { RawquerySearchRepository } from './repository/rawquery-search.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

const repo = {
  provide: ISearchRepository,
  useClass: RawquerySearchRepository,
};

@Module({
  controllers: [SearchController],
  providers: [SearchService, repo],
  imports: [AuthModule], // for JWTAuthGuard
})
export class SearchModule {}
