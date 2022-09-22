import { Injectable, Logger } from '@nestjs/common';
import { BanCabinetDto } from './dto/ban-cabinet.dto';
import { InactivatedCabinetDto } from './dto/inactivated-cabinet.dto';
import { PatchActivationDto } from './dto/patch-activation.dto';
import { IActivationRepository } from './repository/IActivationRepository';

@Injectable()
export class ActivationService {
  private logger = new Logger(ActivationService.name);

  constructor(private activationRepository: IActivationRepository) {}

  async getInactivatedCabinetList(): Promise<InactivatedCabinetDto[]> {
    this.logger.debug('call getInactivatedCabinet');
    const result = await this.activationRepository.getInactivatedCabinetList();
    return result;
  }

  async getBanCabientList(): Promise<BanCabinetDto[]> {
    this.logger.debug('call getBanCabinet');
    const result = await this.activationRepository.getBanCabinetList();
    return result;
  }

  async patchActivation(cabinetInfo: PatchActivationDto): Promise<boolean> {
    this.logger.debug('call patchActivation');
    const result = await this.activationRepository.patchActivation(cabinetInfo);
    return result;
  }
}
