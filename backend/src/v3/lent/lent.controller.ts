import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { LentService } from './lent.service';

@Controller('lent')
@UseGuards(JWTAuthGuard)
export class LentController {
  private logger = new Logger(LentController.name);

  constructor(private lentService: LentService) {}
}
