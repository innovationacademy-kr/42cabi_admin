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

  async updateCabinetStatus(cabinet_id: number, status: CabinetStatusType): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatus.name}`,
    );
    await this.cabinetRepository.updateCabinetStatus(cabinet_id, status);
  }

  async updateLentType(cabinet_id: number, lent_type: LentType): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateLentType.name}`,
    );
    const isLent = this.lentService.isLent(cabinet_id);
    if (isLent == 1) {
      throw new HttpException('🚨 대여 중인 사물함입니다 🚨',HttpStatus.FORBIDDEN);
    }
    try {
      await this.cabinetRepository.updateLentType(cabinet_id, lent_type); 
    } catch (e) {
      throw new HttpException('🚨 존재하지 않는 사물함입니다 🚨',HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatusNote(cabinet_id: number, status_note: string): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateStatusNote.name}`,
    );
    await this.cabinetRepository.updateStatusNote(cabinet_id, status_note);
  }

  async updateCabinetStatusByBundle(status: CabinetStatusType, bundle: number[]): Promise<number[]> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatusByBundle.name}`,
    );
    const result = [];
    for (const cabinet_id of bundle) {
      try {
        await this.cabinetRepository.updateCabinetStatus(cabinet_id, status);
      } catch (e) {
        result.push(cabinet_id);
        continue;
      }
    }
    return result;
  }

  async updateLentTypeByBundle(lent_type: LentType, bundle: number[]): Promise<number[]> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatusByBundle.name}`,
    );
    const result = [];
    for (const cabinet_id of bundle) {
      try {
        await this.cabinetRepository.updateLentType(cabinet_id, lent_type);
      } catch (e) {
        result.push(cabinet_id);
        continue;
      }
    }
    return result;
  }

  async updateCabinetTitle(cabinet_id: number, title: string): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetTitle.name}`,
    );
    await this.cabinetRepository.updateCabinetTitle(cabinet_id, title);
  }
  
  async isCabinetExist(cabinet_id: number): Promise<boolean> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.isCabinetExist.name}`,
    );
    return await this.cabinetRepository.isCabinetExist(cabinet_id);
  }
}
