import { CabinetDto } from '../dto/cabinet.dto';

export interface IReturnRepository {
  getCabinet(cabinetIdx: number): Promise<CabinetDto>;

  returnCabinet(cabinetIdx: number): Promise<boolean>;
}
