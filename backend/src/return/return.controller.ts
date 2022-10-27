import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
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

  // TODO: 섹션별로 일괄 반납을 하는 로직을 만들었으나 당장 사용할 기능은 아니므로 주석 처리해놨습니다.
  // @Delete('/:location/:floor/:section')
  // async sectionReturn(
  //   @Param('location') location: string,
  //   @Param('floor', ParseIntPipe) floor: number,
  //   @Param('section') section: string
  // ):Promise<void>
  // {
  //   this.logger.debug(`Called ${this.sectionReturn.name}`);
  //   await this.returnService.sectionReturn(location, floor, section);
  // }
}
