import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICabinetRepository } from './repository/cabinet.repository.interface';

@Injectable()
export class CabinetService {
  private logger = new Logger(CabinetService.name);

  constructor(
    @Inject('ICabinetRepository')
    private cabinetRepository: ICabinetRepository,
  ) {}
}
