import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
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

  async updateCabinetStatus(
    cabinet_id: number,
    status: CabinetStatusType,
  ): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatus.name}`,
    );
    if ((await this.isCabinetExist(cabinet_id)) === false) {
      throw new HttpException(
        '🚨 존재하지 않는 사물함입니다 🚨',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.cabinetRepository.updateCabinetStatus(cabinet_id, status);
  }

  async updateLentType(cabinet_id: number, lent_type: LentType): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateLentType.name}`,
    );
    const isLent = await this.cabinetRepository.cabinetIsLent(cabinet_id);
    if (isLent === true) {
      throw new HttpException(
        '🚨 대여자가 있는 사물함입니다 🚨',
        HttpStatus.FORBIDDEN,
      );
    }
    if ((await this.isCabinetExist(cabinet_id)) === false) {
      throw new HttpException(
        '🚨 존재하지 않는 사물함입니다 🚨',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.cabinetRepository.updateLentType(cabinet_id, lent_type);
  }

  async updateStatusNote(
    cabinet_id: number,
    status_note: string,
  ): Promise<void> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateStatusNote.name}`,
    );
    if ((await this.isCabinetExist(cabinet_id)) === false) {
      throw new HttpException(
        '🚨 존재하지 않는 사물함입니다 🚨',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.cabinetRepository.updateStatusNote(cabinet_id, status_note);
  }

  //TODO: bundle에 들어있는 캐비넷 id가 bad request라면 exception을 발생시켜야할까요?..
  async updateCabinetStatusByBundle(
    status: CabinetStatusType,
    bundle: number[],
  ): Promise<number[]> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatusByBundle.name}`,
    );
    const result = [];
    for (const cabinet_id of bundle) {
      if ((await this.isCabinetExist(cabinet_id)) === false) {
        result.push(cabinet_id);
        continue;
      }
      try {
        await this.cabinetRepository.updateCabinetStatus(cabinet_id, status);
      } catch (e) {
        result.push(cabinet_id);
        continue;
      }
    }
    return result;
  }

  async updateLentTypeByBundle(
    lent_type: LentType,
    bundle: number[],
  ): Promise<number[]> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.updateCabinetStatusByBundle.name}`,
    );
    const result = [];
    for (const cabinet_id of bundle) {
      const isLent = await this.cabinetRepository.cabinetIsLent(cabinet_id);
      if (isLent === true) {
        result.push(cabinet_id);
        continue;
      }
      if ((await this.isCabinetExist(cabinet_id)) === false) {
        result.push(cabinet_id);
        continue;
      }
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
    if ((await this.isCabinetExist(cabinet_id)) === false) {
      throw new HttpException(
        '🚨 존재하지 않는 사물함입니다 🚨',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.cabinetRepository.updateCabinetTitle(cabinet_id, title);
  }

  async isCabinetExist(cabinet_id: number): Promise<boolean> {
    this.logger.debug(
      `Called ${CabinetService.name} ${this.isCabinetExist.name}`,
    );
    return await this.cabinetRepository.isCabinetExist(cabinet_id);
  }
}
