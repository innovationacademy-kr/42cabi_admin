import { CabinetFloorDto } from '../dto/cabinet-floor.dto';
import { ICabinetRepository } from './ICabinetRepository';

export class MemoryCabinetRepository implements ICabinetRepository {
  private _data: any[] = [];

  constructor() {
    this._data.push({
      floor: 3,
      total: 3,
      used: 3,
      overdue: 3,
      unused: 3,
      disabled: 3,
    });
  }
  async findAll(): Promise<CabinetFloorDto[]> {
    return this._data;
  }
}
