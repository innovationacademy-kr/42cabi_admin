import { Injectable, Logger } from '@nestjs/common';
import { CabinetFloorDto } from './dto/cabinet-floor.dto';
import { ICabinetRepository } from './repository/ICabinetRepository';

@Injectable()
export class CabinetService {
  private logger = new Logger(CabinetService.name);

  constructor(private cabinetRepository: ICabinetRepository) {}

  async getCabinetCountFloor(): Promise<CabinetFloorDto[]> {
    this.logger.debug('call getCabinetCountFloor');
    const result = await this.cabinetRepository.findAll();
    return result;
  }
}
