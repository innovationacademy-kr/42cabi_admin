import { Inject, Injectable, Logger } from '@nestjs/common';
import { LentDto } from './dto/search-lent.dto';
import { LentLogDto } from './dto/search-lentlog.dto';
import { ISearchRepository } from './repository/search.repository.interface';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(
    @Inject('ISearchRepository') private searchRepository: ISearchRepository,
  ) {}

  async getLentByIntraId(intraId: string): Promise<LentDto[]> {
    this.logger.log('call getLentByIntraId');
    const result = await this.searchRepository.getLentByIntraId(intraId);
    return result;
  }

  async getLentLogByIntraId(intraId: string): Promise<LentLogDto[]> {
    this.logger.log('call getLentLogByIntraId');
    const result = await this.searchRepository.getLentLogByIntraId(intraId);
    return result;
  }

  async getLentByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentDto[]> {
    this.logger.log('call getLentByCabinetNum');
    return await this.searchRepository.getLentByCabinetNum(cabinetNum, floor);
  }

  async getLentLogByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentLogDto[]> {
    this.logger.log('call getLentLogByCabinetNum');
    const result = await this.searchRepository.getLentLogByCabinetNum(
      cabinetNum,
      floor,
    );
    return result;
  }
}
