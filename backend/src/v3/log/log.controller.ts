import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { LogPagenationDto } from './dto/log.pagenation.dto';
import { LogService } from './log.service';

@ApiTags('(V3) 로그')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: '로그아웃 상태',
})
@Controller({
  version: '3',
  path: 'log',
})
@UseGuards(JWTAuthGuard)
export class LogController {
  constructor(private cabinetService: LogService) {}

  private logger = new Logger(LogController.name);

  @ApiOperation({
    summary: '특정 유저의 사물함 대여 기록 반환',
    description: '특정 유저의 사물함 대여 기록을 반환합니다.',
  })
  @ApiQuery({
    name: 'index',
    description: '(페이지네이션) 가져올 데이터 인덱스',
  })
  @ApiQuery({
    name: 'length',
    description: '(페이지네이션) 가져올 데이터 길이',
  })
  @ApiParam({
    name: 'user_id',
    description: '유저 고유 ID',
  })
  @ApiOkResponse({
    type: LogPagenationDto,
    description:
      '파라미터로 받은 사물함의 정보를 CabinetInfoResponseDto 형식으로 받아옵니다',
  })
  @ApiBadRequestResponse({
    description: '존재하지 않는 유저, 잘못된 페이지네이션 요청',
  })
  @Get('/user/:user_id')
  async getUserLogs(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<LogPagenationDto> {
    this.logger.debug(`Called ${this.getUserLogs.name}`);
    try {
      return await this.cabinetService.getUserLogs(user_id, index, length);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @ApiOperation({
    summary: '특정 사물함의 대여 기록 반환',
    description: '특정 사물함의 대여 기록을 반환합니다.',
  })
  @ApiQuery({
    name: 'index',
    description: '(페이지네이션) 가져올 데이터 인덱스',
  })
  @ApiQuery({
    name: 'length',
    description: '(페이지네이션) 가져올 데이터 길이',
  })
  @ApiParam({
    name: 'cabinet_id',
    description: '사물함 고유 ID',
  })
  @ApiOkResponse({
    type: LogPagenationDto,
    description:
      '파라미터로 받은 사물함의 정보를 CabinetInfoResponseDto 형식으로 받아옵니다',
  })
  @ApiBadRequestResponse({
    description: '존재하지 않는 사물함, 잘못된 페이지네이션 요청',
  })
  @Get('/cabinet/:cabinet_id')
  async getCabinetLogs(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<LogPagenationDto> {
    this.logger.debug(`Called ${this.getCabinetLogs.name}`);
    try {
      return await this.cabinetService.getCabinetLogs(
        cabinet_id,
        index,
        length,
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
