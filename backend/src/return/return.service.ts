import { Inject, Injectable, Logger } from '@nestjs/common';
import { CabinetDto } from './dto/cabinet.dto';
import { IReturnRepository } from './repository/return.repository.interface';

@Injectable()
export class ReturnService {
  private logger = new Logger(ReturnService.name);

  constructor(
    @Inject('IReturnRepository') private returnRepository: IReturnRepository,
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
}
