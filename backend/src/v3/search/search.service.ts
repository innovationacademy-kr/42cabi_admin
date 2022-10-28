import { Inject, Injectable, Logger } from '@nestjs/common';
import { ISearchRepository } from './repository/search.repository.interface';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(
    @Inject('ISearchRepository') private searchRepository: ISearchRepository,
  ) {}
}
