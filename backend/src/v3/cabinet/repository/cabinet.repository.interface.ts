import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentType from 'src/enums/lent.type.enum';
import { CabinetInfoResponseDto } from '../dto/cabinet.info.response.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICabinetRepository {
  /**
   * 특정 사물함의 상세정보를 가져옵니다.
   *
   * @return CabinetInfoResponstDto
   */
  getCabinetResponseInfo(cabinet_id: number): Promise<CabinetInfoResponseDto>;

  /**
   * 특정 사물함의 status를 변경합니다.
   *
   * @param cabinet_id
   * @param status
   */
  updateCabinetStatus(
    cabinet_id: number,
    status: CabinetStatusType,
  ): Promise<void>;

  /**
   * 특정 사물함의 lent_type를 변경합니다.
   *
   * @param cabinet_id
   * @param lent_type
   */
  updateLentType(cabinet_id: number, lent_type: LentType): Promise<void>;

  /**
   * 특정 사물함의 StatusNote를 변경합니다.
   *
   * @param cabinet_id
   * @param status_note
   */
  updateStatusNote(cabinet_id: number, status_note: string): Promise<void>;

  /**
   * 특정 사물함의 title을 변경합니다.
   *
   * @param cabinet_id
   * @param title
   */
  updateCabinetTitle(cabinet_id: number, title: string): Promise<void>;

  /**
   * cabinet이 대여중인 상태인지 확인합니다.
   *
   * @param cabinet_id
   */
  cabinetIsLent(cabinet_id: number): Promise<boolean>;

  /**
   * 인자로 받은 id의 사물함이 존재하는지 확인합니다.
   *
   * @param cabinet_id
   */
  isCabinetExist(cabinet_id: number): Promise<boolean>;
}
