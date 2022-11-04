import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentType from 'src/enums/lent.type.enum';
import { CabinetInfoResponseDto } from './dto/cabinet.info.response.dto';
import { ICabinetRepository } from './repository/cabinet.repository.interface';

@Injectable()
export class CabinetService {
  private logger = new Logger(CabinetService.name);

  constructor(
    @Inject('ICabinetRepository')
    private cabinetRepository: ICabinetRepository,
  ) {}

  async getCabinetResponseInfo(
    cabinet_id: number,
  ): Promise<CabinetInfoResponseDto> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.getCabinetResponseInfo.name}`,
    );
    try {
      return await this.cabinetRepository.getCabinetResponseInfo(cabinet_id);
    } catch (e) {
      throw new HttpException(
        '🚨 존재하지 않는 사물함입니다 🚨',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCabinetStatusById(cabinet_id: number, status: CabinetStatusType) {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatusById.name}`,
    );
    await this.cabinetRepository.updateCabinetStatusById(cabinet_id, status);
  }

  async updateLentTypeById(cabinet_id: number, lent_type: LentType) {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateLentTypeById.name}`,
    );
    await this.cabinetRepository.updateLentTypeById(cabinet_id, lent_type);
  }
}
