import { Body, Controller, Get, Logger, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
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
  async getCabinetInfo(@Param('cabinet_id',ParseIntPipe) cabinet_id: number): Promise<CabinetInfoResponseDto> {
    this.logger.debug(`Called ${this.getCabinetInfo.name}`);
    return await this.cabinetService.getCabinetResponseInfo(cabinet_id);
  }

  @Patch('/status/:cabinet_id/:status')
  async updateCabinetStatus(@Param('cabinet_id',ParseIntPipe) cabinet_id : number, @Param('status') status : CabinetStatusType): Promise<void> {
    this.logger.debug(`Called ${this.updateCabinetStatus.name}`);
    await this.cabinetService.updateCabinetStatus(cabinet_id, status);
  }

  @Patch('/lent_type/:cabinet_id/:lent_type')
  async updateLentType(@Param('cabinet_id',ParseIntPipe) cabinet_id:number, @Param('lent_type') lent_type: LentType): Promise<void> {
    this.logger.debug(`Called ${this.updateLentType.name}`);
    await this.cabinetService.updateLentType(cabinet_id, lent_type);
  }

  @Patch('/status_note/:cabinet_id')
  async updateStatusNote(@Param('cabinet_id', ParseIntPipe) cabinet_id:number, @Body() status_note: string): Promise<void> {
    this.logger.debug(`Called ${this.updateStatusNote.name}`);
    await this.cabinetService.updateStatusNote(cabinet_id, status_note);
  }

  @Patch('/bundle/status/:status')
  async updateCabinetStatusByBundle(@Param('status') status: CabinetStatusType, @Body() bundle: number[]): Promise<number[]> {
    this.logger.debug(`Called ${this.updateCabinetStatusByBundle.name}`);
    const fail = await this.cabinetService.updateCabinetStatusByBundle(status, bundle);
    return fail;
  }

  @Patch('/bundle/lent_type/:lent_type')
  async updateLentTypeByBundle(@Param('lent_type') lent_type: LentType, @Body() bundle: number[]): Promise<number[]> {
    this.logger.debug(`Called ${this.updateLentTypeByBundle.name}`);
    const fail = await this.cabinetService.updateLentTypeByBundle(lent_type, bundle);
    return fail;
  }

  @Patch('/title/:cabinet_id')
  async updateCabinetTitle(@Param('cabinet_id',ParseIntPipe) cabinet_id : number, @Body() title : string): Promise<void> {
    this.logger.debug(`Called ${this.updateCabinetTitle.name}`);
    await this.cabinetService.updateCabinetTitle(cabinet_id, title);
  }
}
