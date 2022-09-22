import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { CabinetService } from './cabinet.service';
import { CabinetFloorDto } from './dto/cabinet-floor.dto';

@Controller('cabinet')
@UseGuards(JWTAuthGuard)
export class CabinetController {
  constructor(private cabinetService: CabinetService) {}

  private logger = new Logger(CabinetController.name);

  @Get('count/floor')
  async getCabinetCountFloor(): Promise<CabinetFloorDto[]> {
    this.logger.warn('call getCabinetCountFloor()');
    return await this.cabinetService.getCabinetCountFloor();
  }
}
