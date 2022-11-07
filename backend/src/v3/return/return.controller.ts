import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { ReturnBundleFailedResponseDto } from './dto/response/return.bundle.failed.response.dto';
import { ReturnBundleDataDto } from './dto/return.bundle.data.dto';
import { ReturnService } from './return.service';

@ApiTags('(V3) Return')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: '로그아웃 상태',
})
@Controller({
  version: '3',
  path: 'return',
})
@UseGuards(JWTAuthGuard)
export class ReturnController {
  private logger = new Logger(ReturnController.name);

  constructor(private returnService: ReturnService) {}

  @ApiOperation({
    summary: '특정 유저의 캐비넷을 반납',
    description: 'user_id에 해당하는 유저가 빌린 사물함을 반납합니다.',
  })
  @ApiNoContentResponse({
    description: '반납에 성공 시, 204 No Content를 응답합니다.',
  })
  @ApiBadRequestResponse({
    description:
      '해당 유저가 존재하지 않거나 대여중인 사물함이 없는 경우, 400 Bad Request를 응답합니다.',
  })
  @Delete('/user/:user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async returnUserCabinet(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<void> {
    try {
      this.logger.debug(`Called ${this.returnUserCabinet.name}`);
      return await this.returnService.returnUserCabinet(user_id);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  @ApiOperation({
    summary: '특정 캐비넷을 반납',
    description:
      'cabinet_id에 해당하는 캐비넷을 대여한 모든 유저를 반납처리합니다.',
  })
  @ApiNoContentResponse({
    description: '반납에 성공 시, 204 No Content를 응답합니다.',
  })
  @ApiBadRequestResponse({
    description:
      '해당 캐비넷이 존재하지 않거나 해당 사물함을 대여중인 유저가 없다면, 400 Bad Request를 응답합니다.',
  })
  @Delete('/cabinet/:cabinet_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async returnCabinet(
    @Param('cabinet_id', ParseIntPipe) cabinet_id: number,
  ): Promise<void> {
    try {
      this.logger.debug(`Called ${this.returnCabinet.name}`);
      return await this.returnService.returnCabinet(cabinet_id);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  @ApiOperation({
    summary: '선택한 캐비넷이나 유저를 일괄 반납',
    description:
      'Request Body로 cabinet_id 배열이나 user_id 배열을 보내면 해당 캐비넷 혹은 유저에 대해 일괄 반납 처리를 합니다.',
  })
  @ApiNoContentResponse({
    description:
      '모든 요청에 대해 반납에 성공 시, 204 No Content를 응답합니다.',
  })
  @ApiBadRequestResponse({
    type: ReturnBundleFailedResponseDto,
    description:
      '존재하지 않는 유저이거나 대여중인 사물함이 없는 유저가 포함되어 있는 경우 or 존재하지 않는 사물함이거나 유저가 대여중이지 않은 사물함이 포함되어 있는 경우, 400 Bad Request를 응답합니다. 이때 response body로 처리에 실패한 user_id나 cabinet_id의 배열을 전달합니다.',
  })
  @ApiBody({ type: ReturnBundleDataDto })
  @Delete('bundle/cabinet')
  @HttpCode(HttpStatus.NO_CONTENT)
  async returnBundle(
    @Body(
      'users',
      new ParseArrayPipe({
        optional: true,
        items: Number,
        separator: ',',
      }),
    )
    users: number[],
    @Body(
      'cabinets',
      new ParseArrayPipe({
        optional: true,
        items: Number,
        separator: ',',
      }),
    )
    cabinets: number[],
  ): Promise<void> {
    try {
      this.logger.debug(`Called ${this.returnBundle.name}`);
      return await this.returnService.returnBundle(users, cabinets);
    } catch (err) {
      this.logger.error(err, err.response);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}
