import { Injectable, Logger } from '@nestjs/common';
import { LentDto } from './dto/search-lent.dto';
import { LentLogDto } from './dto/search-lentlog.dto';
import { ISearchRepository } from './repository/ISearchRepository';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(private searchRepository: ISearchRepository) {}

  async getLentByIntraId(intraId: string): Promise<LentDto[]> {
    this.logger.log('call getLentByIntraId');
    return await this.searchRepository.getLentByIntraId(intraId);
  }

  async getLentLogByIntraId(intraId: string): Promise<LentLogDto[]> {
    this.logger.log('call getLentLogByIntraId');
    return await this.searchRepository.getLentLogByIntraId(intraId);
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
    return await this.searchRepository.getLentLogByCabinetNum(
      cabinetNum,
      floor,
    );
  }
}
