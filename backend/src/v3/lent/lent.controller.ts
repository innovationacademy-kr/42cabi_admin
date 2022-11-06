import { Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { LentService } from './lent.service';

@ApiTags('(V3) Lent')
@ApiTags('(V3) Return')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: '로그아웃 상태',
})
@Controller({
  version: '3',
  path: 'lent',
})
export class LentController {
  private logger = new Logger(LentController.name);

  constructor(private lentService: LentService) {}

  @ApiOperation({
    summary: '특정 유저에게 특정 캐비넷 대여 시도',
    description: 'cabinet_id에 해당하는 캐비넷을 user_id에 해당하는 유저에게 대여를 시도합니다.',
  })
  @ApiCreatedResponse({
    description: '대여에 성공 시, 201 Created를 응답합니다.',
  })
  @ApiNotFoundResponse({
    description: '해당 캐비넷이나 유저가 존재하지 않으면, 404 Not Found를 응답합니다.',
  })
  @ApiBadRequestResponse({
    description:
      '이미 대여중인 사물함이 있는 경우, 400 Bad Request를 응답합니다.',
  })
  @ApiResponse({
    status: HttpStatus.I_AM_A_TEAPOT,
    description:
      "동아리 사물함을 대여 시도한 경우, 418 I'm a teapot을 응답합니다.",
  })
  @ApiConflictResponse({
    description: `잔여 자리가 없는 경우, 연체 사물함을 대여 시도한 경우,
      임시 밴 사물함이나 고장 사물함을 대여 시도한 경우 409 Conflict를 응답합니다.`,
  })
  @Post('/cabinet/:cabinet_id/:user_id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JWTAuthGuard)
  async lentCabinet(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<void> {
    try {
      this.logger.debug(`Called ${this.lentCabinet.name}`);
      return await this.lentService.lentCabinet(cabinet_id, user_id);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}
