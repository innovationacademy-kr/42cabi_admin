import { CabinetFloorDto } from '../dto/cabinet-floor.dto';
import { Repository } from 'typeorm';
import { ICabinetRepository } from './cabinet.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';

export class CabinetRepository implements ICabinetRepository {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
  ) {}

  async findAll(): Promise<CabinetFloorDto[]> {
    const result = await this.cabinetRepository
      .createQueryBuilder(this.findAll.name)
      .select('floor')
      .addSelect('COUNT(*)', 'total')
      .addSelect(
        `COUNT(CASE WHEN cabinet_status='${CabinetStatusType.SET_EXPIRE_FULL}' THEN 1 END)`,
        'used',
      )
      .addSelect(
        `COUNT(CASE WHEN cabinet_status='${CabinetStatusType.EXPIRED}' THEN 1 END)`,
        'overdue',
      )
      .addSelect(
        `COUNT(CASE WHEN cabinet_status='${CabinetStatusType.AVAILABLE}' or
                                cabinet_status='${CabinetStatusType.SET_EXPIRE_AVAILABLE}' THEN 1 END)`,
        'unused',
      )
      .addSelect(
        `COUNT(CASE WHEN cabinet_status='${CabinetStatusType.BROKEN}' or cabinet_status='${CabinetStatusType.BANNED}' THEN 1 END)`,
        'disabled',
      )
      .groupBy('floor')
      .getRawMany();
    result.map((item) => {
      item.total = Number(item.total);
      item.used = Number(item.used);
      item.overdue = Number(item.overdue);
      item.unused = Number(item.unused);
      item.disabled = Number(item.disabled);
    });
    return result;
  }

  async getCabinetIdBySection(
    location: string,
    floor: number,
    section: string,
  ): Promise<number[]> {
    const result = await this.cabinetRepository
      .createQueryBuilder('c')
      .innerJoin('c.lent', 'lent')
      .select('lent_cabinet_id')
      .where({ location })
      .andWhere({ floor })
      .andWhere({ section })
      .getRawMany();

    return result.map((c) => c.lent_cabinet_id);
  }
}
