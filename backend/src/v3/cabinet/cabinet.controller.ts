import { Controller, Get, Logger, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentType from 'src/enums/lent.type.enum';
import { CabinetService } from './cabinet.service';
import { CabinetInfoResponseDto } from './dto/cabinet.info.response.dto';

@ApiTags('(V3) Cabinet')
@Controller({
  version: '3',
  path: 'cabinet',
})
@UseGuards(JWTAuthGuard)
export class CabinetController {
  constructor(private cabinetService: CabinetService) {}

  private logger = new Logger(CabinetController.name);

  @Get('/:cabinet_id')
  async getCabinetInfoById(@Param('cabinet_id') cabinet_id: number): Promise<CabinetInfoResponseDto> {
    this.logger.debug(`Called ${this.getCabinetInfoById.name}`);
    return await this.cabinetService.getCabinetResponseInfo(cabinet_id);
  }

  @Patch('/status/:cabinet_id/:status')
  async updateCabinetStatusById(@Param('cabinet_id') cabinet_id : number, @Param('status') status : CabinetStatusType): Promise<void> {
    this.logger.debug(`Called ${this.updateCabinetStatusById.name}`);
    await this.cabinetService.updateCabinetStatusById(cabinet_id, status);
  }

  @Patch('/lent_type/:cabinet_id/:lent_type')
  async updateLentTypeById(@Param('cabinet_id') cabinet_id:number, @Param('lent_type') lent_type: LentType): Promise<void> {
    this.logger.debug(`Called ${this.updateLentTypeById.name}`);
    await this.cabinetService.updateLentTypeById(cabinet_id, lent_type);
  }
}
