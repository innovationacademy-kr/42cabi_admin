import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CabinetLentLogDto } from './dto/cabinet-lent-log.dto';
import { LogPagenationDto } from './dto/log.pagenation.dto';
import { ILogRepository } from './repository/log.repository.interface';

@Injectable()
export class LogService {
  private logger = new Logger(LogService.name);

  constructor(
    @Inject('ILogRepository')
    private logRepository: ILogRepository,
  ) {}

  /**
   * 특정 유저의 사물함 대여 기록을 반환합니다.
   *
   * @param user_id 유저 고유 ID
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns LogPagenationDto
   * @throw HTTPError
   */
  async getUserLogs(
    user_id: number,
    index: number,
    length: number,
  ): Promise<LogPagenationDto> {
    const result = await this.logRepository.getUserLogs(user_id, index, length);
    if (index !== 0 && length !== 0 && result.total_length === 0) {
      throw new BadRequestException('Index Error');
    }
    return result;
  }

  /**
   * 특정 사물함의 대여 기록을 반환합니다.
   *
   * @param cabinet_id 캐비넷 고유 ID
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns LogPagenationDto
   * @throw HTTPError
   */
  async getCabinetLogs(
    cabinet_id: number,
    index: number,
    length: number,
  ): Promise<LogPagenationDto> {
    const result = await this.logRepository.getCabinetLogs(
      cabinet_id,
      index,
      length,
    );
    if (index !== 0 && length !== 0 && result.total_length === 0) {
      throw new BadRequestException('Index Error');
    }
    return result;
  }
}
