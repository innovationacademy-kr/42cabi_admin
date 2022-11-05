import { Inject, Injectable, Logger } from '@nestjs/common';
import LentType from 'src/enums/lent.type.enum';
import { BlockedUserInfoPagenationDto } from './dto/blocked-user-info.pagenation.dto';
import { BrokenCabinetInfoPagenationDto } from './dto/broken-cabinet-info.pagenation.dto';
import { CabinetInfoPagenationDto } from './dto/cabinet-info.pagenation.dto';
import { UserInfoPagenationDto } from './dto/user-info.pagenation.dto';
import { ISearchRepository } from './repository/search.repository.interface';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(
    @Inject('ISearchRepository') private searchRepository: ISearchRepository,
  ) {}

  /**
   * 인트라 아이디에 대한 검색결과를 가지고 옵니다.
   *
   * @param intra_id 인트라 아이디
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns CabinetInfoPagenationDto
   * @throw HTTPError
   */
  async searchByIntraId(
    intra_id: string,
    index: number,
    length: number,
  ): Promise<UserInfoPagenationDto> {
    return await this.searchRepository.searchByIntraId(intra_id, index, length);
  }

  /**
   * 특정 캐비넷 타입인 사물함 리스트를 가지고 옵니다.
   *
   * @param lent_type 대여 타입
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns CabinetInfoPagenationDto
   * @throw HTTPError
   */
  async searchByLentType(
    lent_type: LentType,
    index: number,
    length: number,
  ): Promise<CabinetInfoPagenationDto> {
    return await this.searchRepository.searchByLentType(
      lent_type,
      index,
      length,
    );
  }

  /**
   * 해당 사물함 번호를 가진 사물함 리스트를 반환합니다.
   *
   * @param visible_num 사물함 번호
   * @returns CabinetInfoPagenationDto
   * @throw HTTPError
   */
  async searchByCabinetNumber(
    visible_num: number,
  ): Promise<CabinetInfoPagenationDto> {
    return await this.searchRepository.searchByCabinetNumber(visible_num);
  }

  /**
   * 정지당한 사물함 리스트를 반환합니다.
   *
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns CabinetInfoPagenationDto
   * @throw HTTPError
   */
  async searchByBannedCabinet(
    index: number,
    length: number,
  ): Promise<CabinetInfoPagenationDto> {
    return await this.searchRepository.searchByBannedCabinet(index, length);
  }

  /**
   * 고장난 사물함 리스트를 반환합니다.
   *
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns BrokenCabinetInfoPagenationDto
   * @throw HTTPError
   */
  async searchByBrokenCabinet(
    index: number,
    length: number,
  ): Promise<BrokenCabinetInfoPagenationDto> {
    return await this.searchRepository.searchByBrokenCabinet(index, length);
  }

  /**
   * 밴 당한 유저 리스트를 반환합니다.
   *
   * @param user_id 유저 고유 ID
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns LogPagenationDto
   * @throw HTTPError
   */
  async searchByBanUser(
    index: number,
    length: number,
  ): Promise<BlockedUserInfoPagenationDto> {
    return await this.searchRepository.searchByBanUser(index, length);
  }
}
