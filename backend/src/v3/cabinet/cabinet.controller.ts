import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { CabinetService } from './cabinet.service';

@ApiTags('(V3) Cabinet')
@Controller({
  version: '3',
  path: 'cabinet',
})
@UseGuards(JWTAuthGuard)
export class CabinetController {
  constructor(private cabinetService: CabinetService) {}

  private logger = new Logger(CabinetController.name);
}
