import { LogPagenationDto } from '../dto/log.pagenation.dto';

export interface ILogRepository {
  /**
   * 특정 유저의 사물함 대여 기록을 반환합니다.
   *
   * @param user_id 유저 고유 ID
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   */
  getUserLogs(
    user_id: number,
    index: number,
    length: number,
  ): Promise<LogPagenationDto>;

  /**
   * 특정 사물함의 대여 기록을 반환합니다.
   *
   * @param cabinet_id 캐비넷 고유 ID
   * @param index 가져올 데이터 인덱스
   * @param length 가져올 데이터 길이
   */
  getCabinetLogs(
    cabinet_id: number,
    index: number,
    length: number,
  ): Promise<LogPagenationDto>;
}
