import LentType from 'src/enums/lent.type.enum';
import { BlockedUserInfoPagenationDto } from '../dto/blocked-user-info.pagenation.dto';
import { BrokenCabinetInfoPagenationDto } from '../dto/broken-cabinet-info.pagenation.dto';
import { CabinetInfoPagenationDto } from '../dto/cabinet-info.pagenation.dto';
import { UserInfoPagenationDto } from '../dto/user-info.pagenation.dto';

export interface ISearchRepository {
  /**
   * 인트라 아이디에 대한 검색결과를 가지고 옵니다.
   *
   * @param intra_id 인트라 아이디
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns CabinetInfoPagenationDto
   */
  searchByIntraId(
    intra_id: string,
    index: number,
    length: number,
  ): Promise<UserInfoPagenationDto>;

  /**
   * 특정 캐비넷 타입인 사물함 리스트를 가지고 옵니다.
   *
   * @param lent_type 대여 타입
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns CabinetInfoPagenationDto
   */
  searchByLentType(
    lent_type: LentType,
    index: number,
    length: number,
  ): Promise<CabinetInfoPagenationDto>;

  /**
   * 해당 사물함 번호를 가진 사물함 리스트를 반환합니다.
   *
   * @param visible_num 사물함 번호
   * @returns CabinetInfoPagenationDto
   */
  searchByCabinetNumber(visible_num: number): Promise<CabinetInfoPagenationDto>;

  /**
   * 정지당한 사물함 리스트를 반환합니다.
   *
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns CabinetInfoPagenationDto
   */
  searchByBannedCabinet(
    index: number,
    length: number,
  ): Promise<CabinetInfoPagenationDto>;

  /**
   * 고장난 사물함 리스트를 반환합니다.
   *
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns BrokenCabinetInfoPagenationDto
   */
  searchByBrokenCabinet(
    index: number,
    length: number,
  ): Promise<BrokenCabinetInfoPagenationDto>;

  /**
   * 밴 당한 유저 리스트를 반환합니다.
   *
   * @param user_id 유저 고유 ID
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   * @returns LogPagenationDto
   */
  searchByBanUser(
    index: number,
    length: number,
  ): Promise<BlockedUserInfoPagenationDto>;
}
