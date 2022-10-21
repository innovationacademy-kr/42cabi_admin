import { LentDto } from '../dto/search-lent.dto';
import { LentLogDto } from '../dto/search-lentlog.dto';

export interface ISearchRepository {
  /**
   * intra_id 기준 lent 검색 정보를 가져옵니다.
   *
   * @returns LentByIntraDto[]
   */

  getLentByIntraId(intraId: string): Promise<LentDto[]>;

  /**
   * intra_id 기준 lent_log 검색 정보를 가져옵니다.
   *
   * @returns LentLogDto[]
   */
  getLentLogByIntraId(intraId: string): Promise<LentLogDto[]>;

  /**
   * cabinet_num 기준 lent 검색 정보를 가져옵니다.
   *
   * @returns LentByCabiDto[]
   */
  getLentByCabinetNum(cabinetNum: number, floor: number): Promise<LentDto[]>;

  /**
   * cabinet_num 기준 lent_log 검색 정보를 가져옵니다.
   *
   * @returns LentLogDto[]
   */
  getLentLogByCabinetNum(
    cabinetNum: number,
    floor: number,
  ): Promise<LentLogDto[]>;
}
