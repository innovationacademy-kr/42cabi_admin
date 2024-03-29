import { BanCabinetDto } from '../dto/ban-cabinet.dto';
import { InactivatedCabinetDto } from '../dto/inactivated-cabinet.dto';
import { PatchActivationDto } from '../dto/patch-activation.dto';

export interface IActivationRepository {
  /**
   * 사용불가 사물함 리스트를 가져옵니다.
   * @returns InactivateCabinetDto[]
   */
  getInactivatedCabinetList(): Promise<InactivatedCabinetDto[]>;

  /**
   * 영구정지 사물함 리스트를 가져옵니다.
   * @returns BanCabinetDtop[]
   */
  getBanCabinetList(): Promise<BanCabinetDto[]>;

  /**
   * 사물함 상태를 변경합니다.
   * @returns boolean
   */
  patchActivation(cabinetInfo: PatchActivationDto): Promise<boolean>;
}
