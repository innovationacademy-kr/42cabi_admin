import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { LentLogDto } from './dto/search-lentlog.dto';
import { LentDto } from './dto/search-lent.dto';
import { QueryDto } from './dto/search-query.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(JWTAuthGuard)
export class SearchController {
  private logger = new Logger(SearchController.name);

  constructor(private searchService: SearchService) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getSearch(@Query() queryDto: QueryDto): Promise<SearchResponseDto> {
    this.logger.log('call getSearch()');
    let resultFromLent: LentDto[] = [];
    let resultFromLentLog: LentLogDto[] = [];
    if (queryDto.intraId && !(queryDto.cabinetNum || queryDto.floor)) {
      [resultFromLent, resultFromLentLog] = await Promise.all([
        this.searchService.getLentByIntraId(queryDto.intraId),
        this.searchService.getLentLogByIntraId(queryDto.intraId),
      ]);
      if (resultFromLent.length === 0 && resultFromLentLog.length !== 0) {
        resultFromLent.push({
          intra_id: resultFromLentLog[0].intra_id,
          auth: 0,
          cabinet_id: null,
          cabinet_num:null,
          location: null,
          section: null,
          floor: null,
          activation: null,
          lent_id: null,
          lent_time: null,
          expire_time: null,
        });
      }
    } else if (queryDto.cabinetNum && queryDto.floor && !queryDto.intraId) {
      [resultFromLent, resultFromLentLog] = await Promise.all([
        this.searchService.getLentByCabinetNum(
          queryDto.cabinetNum,
          queryDto.floor,
        ),
        this.searchService.getLentLogByCabinetNum(
          queryDto.cabinetNum,
          queryDto.floor,
        ),
      ]);
    } else {
      throw new BadRequestException();
    }
    const result = { resultFromLent, resultFromLentLog };
    return result;
  }
}
