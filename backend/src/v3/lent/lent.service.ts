import { Inject, Injectable, Logger } from '@nestjs/common';
import { ILentRepository } from './repository/lent.repository.interface';

@Injectable()
export class LentService {
  private logger = new Logger(LentService.name);

  constructor(
    @Inject('ILentRepository')
    private lentRepository: ILentRepository,
  ) {}
}
