import { CabinetFloorDto } from '../dto/cabinet-floor.dto';

export interface ICabinetRepository {
  /**
   * 전반적인 층별 사물함 현황 (사용 중, 연체, 사용 불가, 미사용) 을 가져옵니다.
   *
   * @returns CabinetFloorDto[]
   */
  findAll(): Promise<CabinetFloorDto[]>;

  /**
   * section별로 lent된 cabinetid list를 가져옵니다.
   * 
   * @param location 
   * @param floor 
   * @param section 
   */
  getCabinetIdBySection(location: string, floor: number, section: string): Promise<number[]>;
}
