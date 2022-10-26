import { Inject, Injectable, Logger } from '@nestjs/common';
import { CabinetFloorDto } from './dto/cabinet-floor.dto';
import { ICabinetRepository } from './repository/cabinet.repository.interface';

@Injectable()
export class CabinetService {
  private logger = new Logger(CabinetService.name);

  constructor(
    @Inject('ICabinetRepository')
    private cabinetRepository: ICabinetRepository,
  ) {}

  async getCabinetCountFloor(): Promise<CabinetFloorDto[]> {
    this.logger.debug('call getCabinetCountFloor');
    const result = await this.cabinetRepository.findAll();
    return result;
  }

  async getCabinetIdBySection(location: string, floor: number, section: string): Promise<number[]> {
    this.logger.debug(`Called ${this.getCabinetIdBySection.name}`);
    return await this.cabinetRepository.getCabinetIdBySection(location, floor, section);
  }
}
