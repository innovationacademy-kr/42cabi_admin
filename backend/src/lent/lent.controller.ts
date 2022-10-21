import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { LentInfoResponseDto } from './dto/lent-info.response.dto';
import { OverdueInfoDto } from './dto/overdue-info.dto';
import { LentService } from './lent.service';

@Controller('lent')
@UseGuards(JWTAuthGuard)
export class LentController {
  private logger = new Logger(LentController.name);

  constructor(private lentService: LentService) {}
  @Get('/')
  async getLentInfo(): Promise<LentInfoResponseDto> {
    this.logger.log('call getLentInfo()');
    return await this.lentService.getLentUserInfo();
  }

  @Get('/overdue')
  async getLentOverdueInfo(): Promise<OverdueInfoDto[]> {
    this.logger.log('call getLentOverdueInfo()');
    return await this.lentService.getLentOverdue();
  }
}
