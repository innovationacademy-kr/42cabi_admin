import { Inject, Injectable, Logger } from '@nestjs/common';
import { CabinetService } from 'src/v3/cabinet/cabinet.service';
import { IReturnRepository } from './repository/return.repository.interface';

@Injectable()
export class ReturnService {
  private logger = new Logger(ReturnService.name);

  constructor(
    @Inject('IReturnRepository') private returnRepository: IReturnRepository,
    private cabinetService: CabinetService,
  ) {}
}
