import { CabinetFloorDto } from '../dto/cabinet-floor.dto';

export abstract class ICabinetRepository {
  /**
   * 전반적인 층별 사물함 현황 (사용 중, 연체, 사용 불가, 미사용) 을 가져옵니다.
   *
   * @returns CabinetFloorDto[]
   */
  abstract findAll(): Promise<CabinetFloorDto[]>;
}
