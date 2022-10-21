import { Inject, Injectable, Logger } from '@nestjs/common';
import { LentInfoResponseDto } from './dto/lent-info.response.dto';
import { OverdueInfoDto } from './dto/overdue-info.dto';
import { ILentRepository } from './repository/lent.repository.interface';

@Injectable()
export class LentService {
  private logger = new Logger(LentService.name);

  constructor(
    @Inject('ILentRepository')
    private lentRepository: ILentRepository,
  ) {}

  async getLentUserInfo(): Promise<LentInfoResponseDto> {
    this.logger.debug('call getLentUserInfo');
    const result = await this.lentRepository.getLentInfo();

    return { lentInfo: result };
  }

  async getLentOverdue(): Promise<OverdueInfoDto[]> {
    this.logger.debug('call getLentOverdue');
    const result = await this.lentRepository.getLentOverdue();

    return result;
  }
}
