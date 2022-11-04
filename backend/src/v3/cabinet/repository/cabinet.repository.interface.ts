import CabinetStatusType from "src/enums/cabinet.status.type.enum";
import LentType from "src/enums/lent.type.enum";
import { CabinetInfoResponseDto } from "../dto/cabinet.info.response.dto";

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
   updateCabinetStatusById(
    cabinet_id: number,
    status: CabinetStatusType,
  ): Promise<void>;

  /**
   * 특정 사물함의 lent_type를 변경합니다.
   *
   * @param cabinet_id
   * @param lent_type
   */
   updateLentTypeById(
    cabinet_id: number,
    lent_type: LentType,
  ): Promise<void>;
}
