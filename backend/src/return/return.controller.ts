import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { CabinetDto } from './dto/cabinet.dto';
import { ReturnService } from './return.service';

@Controller('return')
@UseGuards(JWTAuthGuard)
export class ReturnController {
  private logger = new Logger(ReturnController.name);

  constructor(private returnService: ReturnService) {}

  @Get('/')
  async getReturn(
    @Query('cabinetIdx', ParseIntPipe) cabinetIdx: number,
  ): Promise<CabinetDto> {
    this.logger.log('call getReturn()');
    return await this.returnService.getReturn(cabinetIdx);
  }

  @Patch('/')
  async patchReturn(
    @Query('cabinetIdx', ParseIntPipe) cabinetIdx: number,
  ): Promise<string> {
    this.logger.log('call patchReturn()');
    const result = await this.returnService.patchReturn(cabinetIdx);
    if (!result) {
      throw new BadRequestException();
    }
    return 'ok';
  }
}
