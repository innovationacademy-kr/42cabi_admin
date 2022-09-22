import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { ActivationService } from './activation.service';
import { BanCabinetDto } from './dto/ban-cabinet.dto';
import { InactivatedCabinetDto } from './dto/inactivated-cabinet.dto';
import { PatchActivationDto } from './dto/patch-activation.dto';

@Controller('activation')
@UseGuards(JWTAuthGuard)
export class ActivationController {
  constructor(private activationService: ActivationService) {}

  private logger = new Logger(ActivationController.name);

  @Get('/')
  async getInactivatedCabinet(): Promise<InactivatedCabinetDto[]> {
    this.logger.log('call getInactivatedCabinet()');
    return await this.activationService.getInactivatedCabinetList();
  }

  @Patch('/')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  async patchActivation(
    @Body()
    cabinetInfo: PatchActivationDto,
  ): Promise<boolean> {
    this.logger.log('call patchActivation(), data : ', cabinetInfo);
    return await this.activationService.patchActivation(cabinetInfo);
  }

  @Get('/ban')
  async getBanCabinet(): Promise<BanCabinetDto[]> {
    this.logger.log('call getBanCabinet()');
    return await this.activationService.getBanCabientList();
  }
}
