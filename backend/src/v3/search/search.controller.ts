import {
  Controller,
  Get,
  Logger,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import LentType from 'src/enums/lent.type.enum';
import { BlockedUserInfoPagenationDto } from './dto/blocked-user-info.pagenation.dto';
import { BrokenCabinetInfoPagenationDto } from './dto/broken-cabinet-info.pagenation.dto';
import { CabinetInfoPagenationDto } from './dto/cabinet-info.pagenation.dto';
import { UserInfoPagenationDto } from './dto/user-info.pagenation.dto';
import { SearchService } from './search.service';

@ApiTags('(V3) 검색 관련을 다루는 라우터')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: '로그아웃 상태',
})
@Controller({
  version: '3',
  path: 'search',
})
@UseGuards(JWTAuthGuard)
export class SearchController {
  private logger = new Logger(SearchController.name);

  constructor(private searchService: SearchService) {}

  @ApiOperation({
    summary: '인트라 아이디 검색',
    description:
      '인트라 아이디에 대한 검색결과를 가지고 옵니다. 페이지네이션을 지원합니다.',
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
    name: 'intra_id',
    description: '인트라 아이디',
  })
  @ApiOkResponse({
    type: UserInfoPagenationDto,
    description: '검색 결과를 받아옵니다.',
  })
  @Get('/intraid/:intra_id')
  async searchByIntraId(
    @Param('intra_id') intra_id: string,
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<UserInfoPagenationDto> {
    this.logger.debug(`Called ${this.searchByIntraId.name}`);
    try {
      return await this.searchService.searchByIntraId(intra_id, index, length);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @ApiOperation({
    summary: '특정 캐비넷 타입인 사물함 리스트 검색',
    description:
      '특정 캐비넷 타입인 사물함 리스트를 가지고 옵니다. 페이지네이션을 지원합니다.',
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
    name: 'lent_type',
    description: '대여 타입 (ENUM)',
    enum: LentType,
  })
  @ApiOkResponse({
    type: CabinetInfoPagenationDto,
    description: '검색 결과를 받아옵니다.',
  })
  @Get('/cabinet/lent_type/:lent_type')
  async searchByLentType(
    @Param('lent_type', new ParseEnumPipe(LentType)) lent_type: LentType,
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<CabinetInfoPagenationDto> {
    this.logger.debug(`Called ${this.searchByLentType.name}`);
    try {
      return await this.searchService.searchByLentType(
        lent_type,
        index,
        length,
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @ApiOperation({
    summary: '해당 사물함 번호를 가진 사물함 리스트',
    description: '해당 사물함 번호를 가진 사물함 리스트를 반환합니다.',
  })
  @ApiParam({
    name: 'visible_num',
    description: '사물함 번호',
  })
  @ApiOkResponse({
    type: CabinetInfoPagenationDto,
    description: '검색 결과를 받아옵니다.',
  })
  @Get('/cabinet/visible_num/:visible_num')
  async searchByCabinetNumber(
    @Param('visible_num', ParseIntPipe) visible_num: number,
  ): Promise<CabinetInfoPagenationDto> {
    this.logger.debug(`Called ${this.searchByCabinetNumber.name}`);
    try {
      return await this.searchService.searchByCabinetNumber(visible_num);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @ApiOperation({
    summary: '정지당한 사물함 리스트',
    description:
      '정지당한 사물함 리스트를 반환합니다. 페이지네이션을 지원합니다.',
  })
  @ApiQuery({
    name: 'index',
    description: '(페이지네이션) 가져올 데이터 인덱스',
  })
  @ApiQuery({
    name: 'length',
    description: '(페이지네이션) 가져올 데이터 길이',
  })
  @ApiOkResponse({
    type: CabinetInfoPagenationDto,
    description: '검색 결과를 받아옵니다.',
  })
  @Get('/cabinet/banned')
  async searchByBannedCabinet(
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<CabinetInfoPagenationDto> {
    this.logger.debug(`Called ${this.searchByBannedCabinet.name}`);
    try {
      return await this.searchService.searchByBannedCabinet(index, length);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @ApiOperation({
    summary: '고장난 사물함 리스트',
    description:
      '고장난 사물함 리스트를 반환합니다. 페이지네이션을 지원합니다.',
  })
  @ApiQuery({
    name: 'index',
    description: '(페이지네이션) 가져올 데이터 인덱스',
  })
  @ApiQuery({
    name: 'length',
    description: '(페이지네이션) 가져올 데이터 길이',
  })
  @ApiOkResponse({
    type: BrokenCabinetInfoPagenationDto,
    description: '부서진 사물함을 받아옵니다.',
  })
  @Get('/cabinet/broken')
  async searchByBrokenCabinet(
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<BrokenCabinetInfoPagenationDto> {
    this.logger.debug(`Called ${this.searchByBrokenCabinet.name}`);
    try {
      return await this.searchService.searchByBrokenCabinet(index, length);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @ApiOperation({
    summary: '밴 당한 유저 리스트',
    description: '밴 당한 유저 리스트를 반환합니다. 페이지네이션을 지원합니다.',
  })
  @ApiQuery({
    name: 'index',
    description: '(페이지네이션) 가져올 데이터 인덱스',
  })
  @ApiQuery({
    name: 'length',
    description: '(페이지네이션) 가져올 데이터 길이',
  })
  @ApiOkResponse({
    type: BlockedUserInfoPagenationDto,
    description: '블록된 유저들을 받아옵니다.',
  })
  @Get('/cabinet/banuser')
  async searchByBanUser(
    @Query('index', ParseIntPipe) index: number,
    @Query('length', ParseIntPipe) length: number,
  ): Promise<BlockedUserInfoPagenationDto> {
    this.logger.debug(`Called ${this.searchByBanUser.name}`);
    try {
      return await this.searchService.searchByBanUser(index, length);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
