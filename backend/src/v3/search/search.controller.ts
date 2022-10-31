import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { SearchService } from './search.service';

@ApiTags('(V3) Search')
@Controller({
  version: '3',
  path: 'search',
})
@UseGuards(JWTAuthGuard)
export class SearchController {
  private logger = new Logger(SearchController.name);

  constructor(private searchService: SearchService) {}
}
