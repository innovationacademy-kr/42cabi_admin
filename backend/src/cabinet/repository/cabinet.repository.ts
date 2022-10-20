import { CabinetFloorDto } from '../dto/cabinet-floor.dto';
import { Repository } from 'typeorm';
import { ICabinetRepository } from './cabinet.interface.repository';
import { InjectRepository } from '@nestjs/typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';

export class CabinetRepository implements ICabinetRepository {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
  ) {}

  async findAll(): Promise<CabinetFloorDto[]> {
    const result = await this.cabinetRepository.createQueryBuilder(this.findAll.name)
    .select(['floor'])
    .addSelect("COUNT(*) as total")
    .addSelect(`COUNT(case when cabinet_status='${CabinetStatusType.SET_EXPIRE_FULL}' then 1 end) as used`)
    .addSelect(`COUNT(case when cabinet_status='${CabinetStatusType.EXPIRED}' then 1 end) as overdue`)
    .addSelect(`COUNT(case when cabinet_status='${CabinetStatusType.AVAILABLE}' or
                                cabinet_status='${CabinetStatusType.SET_EXPIRE_AVAILABLE}' then 1 end) as unused`)
    .addSelect(`COUNT(case when cabinet_status='${CabinetStatusType.BROKEN}' or cabinet_status='${CabinetStatusType.BANNED}' then 1 end) as disabled`)
    .groupBy('floor')
    .execute();
    return result;
  }
}
