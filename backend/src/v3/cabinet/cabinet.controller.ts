import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentType from 'src/enums/lent.type.enum';
import { CabinetService } from './cabinet.service';
import { CabinetInfoResponseDto } from './dto/cabinet.info.response.dto';
import { CabinetStatusNoteRequestDto } from './dto/cabinet.status.note.request.dto';
import { CabinetTitleRequestDto } from './dto/cabinet.title.request.dto';

@ApiTags('(V3) Cabinet')
@ApiBearerAuth()
@Controller({
  version: '3',
  path: 'cabinet',
})
@UseGuards(JWTAuthGuard)
export class CabinetController {
  constructor(private cabinetService: CabinetService) {}

  private logger = new Logger(CabinetController.name);

  @ApiOperation({
    summary: '사물함 정보 호출',
    description: 'cabinet_id를 받아 특정 사물함의 상세정보를 받아옵니다.',
  })
  @ApiOkResponse({
    type: CabinetInfoResponseDto,
    description:
      '파라미터로 받은 사물함의 정보를 CabinetInfoResponseDto 형식으로 받아옵니다',
  })
  @ApiBadRequestResponse({
    description: '비정상 파라미터',
  })
  @Get('/:cabinet_id')
  async getCabinetInfo(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
  ): Promise<CabinetInfoResponseDto> {
    this.logger.debug(`Called ${this.getCabinetInfo.name}`);
    return await this.cabinetService.getCabinetResponseInfo(cabinet_id);
  }

  @ApiOperation({
    summary: '사물함 상태 변경',
    description: 'cabinet_id를 받아 사물함의 상태를 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '성공',
  })
  @ApiBadRequestResponse({
    description: '비정상 상태 및 cabinet_id',
  })
  @Patch('/status/:cabinet_id/:status')
  async updateCabinetStatus(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
    @Param('status', new ParseEnumPipe(CabinetStatusType))
    status: CabinetStatusType,
  ): Promise<void> {
    this.logger.debug(`Called ${this.updateCabinetStatus.name}`);
    await this.cabinetService.updateCabinetStatus(cabinet_id, status);
  }

  @ApiOperation({
    summary: '사물함 lent_type 변경',
    description: 'cabinet_id를 받아 사물함의 lent_type을 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '성공',
  })
  @ApiBadRequestResponse({
    description: '비정상 lent_type 및 cabinet_id',
  })
  @ApiForbiddenResponse({
    description: '대여 중인 캐비넷',
  })
  @Patch('/lent_type/:cabinet_id/:lent_type')
  async updateLentType(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
    @Param('lent_type', new ParseEnumPipe(LentType)) lent_type: LentType,
  ): Promise<void> {
    this.logger.debug(`Called ${this.updateLentType.name}`);
    await this.cabinetService.updateLentType(cabinet_id, lent_type);
  }

  @ApiOperation({
    summary: '사물함 고장 사유 변경',
    description: 'cabinet_id를 받아 사물함의 고장 사유를 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '성공',
  })
  @ApiBadRequestResponse({
    description: '존재하지 않는 cabinet_id',
  })
  @Patch('/status_note/:cabinet_id')
  async updateStatusNote(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
    @Body(new ValidationPipe()) status_note: CabinetStatusNoteRequestDto,
  ): Promise<void> {
    this.logger.debug(`Called ${this.updateStatusNote.name}`);
    await this.cabinetService.updateStatusNote(
      cabinet_id,
      status_note.status_note,
    );
  }

  @ApiOperation({
    summary: '특정 사물함들의 상태 변경',
    description: 'cabinet_id 배열을 받아 사물함들의 상태를 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '성공',
  })
  @ApiBadRequestResponse({
    description: '비정상 상태 및 cabinet_id',
  })
  @Patch('/bundle/status/:status')
  async updateCabinetStatusByBundle(
    @Param('status', new ParseEnumPipe(CabinetStatusType))
    status: CabinetStatusType,
    @Body() bundle: number[],
  ): Promise<number[] | void> {
    this.logger.debug(`Called ${this.updateCabinetStatusByBundle.name}`);
    const fail = await this.cabinetService.updateCabinetStatusByBundle(
      status,
      bundle,
    );
    if (fail.length !== 0) {
      throw new HttpException(fail, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: '특정 사물함들의 lent_type 변경',
    description: 'cabinet_id 배열을 받아 사물함들의 lent_type을 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '성공',
  })
  @ApiBadRequestResponse({
    description: '비정상 lent_type 및 cabinet_id',
  })
  @ApiForbiddenResponse({
    description: '대여 중인 캐비넷',
  })
  @Patch('/bundle/lent_type/:lent_type')
  async updateLentTypeByBundle(
    @Param('lent_type', new ParseEnumPipe(LentType)) lent_type: LentType,
    @Body() bundle: number[],
  ): Promise<number[] | void> {
    this.logger.debug(`Called ${this.updateLentTypeByBundle.name}`);
    const fail = await this.cabinetService.updateLentTypeByBundle(
      lent_type,
      bundle,
    );
    if (fail.length !== 0) {
      throw new HttpException(fail, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: '사물함 title 변경',
    description: 'cabinet_id를 받아 사물함의 title을 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '성공',
  })
  @ApiBadRequestResponse({
    description: '존재하지 않는 cabinet_id',
  })
  @Patch('/title/:cabinet_id')
  async updateCabinetTitle(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
    @Body(new ValidationPipe()) title: CabinetTitleRequestDto,
  ): Promise<void> {
    this.logger.debug(`Called ${this.updateCabinetTitle.name}`);
    console.log(title);
    await this.cabinetService.updateCabinetTitle(cabinet_id, title.title);
  }
}
