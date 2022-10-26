import { Inject, Injectable, Logger } from '@nestjs/common';
import { CabinetService } from 'src/cabinet/cabinet.service';
import { CabinetDto } from './dto/cabinet.dto';
import { IReturnRepository } from './repository/return.repository.interface';

@Injectable()
export class ReturnService {
  private logger = new Logger(ReturnService.name);

  constructor(
    @Inject('IReturnRepository') private returnRepository: IReturnRepository,
    private cabinetService: CabinetService,
  ) {}

  async getReturn(cabinetIdx: number): Promise<CabinetDto> {
    this.logger.debug(`call getReturn (cabinetIdx: ${cabinetIdx})`);
    const result = await this.returnRepository.getCabinet(cabinetIdx);
    return result;
  }

  async patchReturn(cabinetIdx: number): Promise<boolean> {
    this.logger.debug(`call patchReturn (cabinetIdx: ${cabinetIdx})`);
    const result = await this.returnRepository.returnCabinet(cabinetIdx);
    return result;
  }

  async allReturn(location: string, floor: number, section: string): Promise<void> {
    this.logger.debug(`Called ${this.allReturn.name}`);
    const cabinetList = await this.cabinetService.getCabinetIdBySection(location, floor, section);
    cabinetList.forEach(async (id) => await this.patchReturn(id));
  }
}
