import { InjectRepository } from '@nestjs/typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentType from 'src/enums/lent.type.enum';
import { Repository } from 'typeorm';
import { CabinetInfoResponseDto } from '../dto/cabinet.info.response.dto';
import { ICabinetRepository } from './cabinet.repository.interface';

export class CabinetRepository implements ICabinetRepository {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
  ) {}


  async getCabinetResponseInfo(
    cabinet_id: number,
  ): Promise<CabinetInfoResponseDto> {
    const result = await this.cabinetRepository.findOne({
      relations: {
        lent: {
          user: true,
        },
      },
      where: {
        cabinet_id,
      },
    });
    return {
      cabinet_id: result.cabinet_id,
      cabinet_num: result.cabinet_num,
      lent_type: result.lent_type,
      cabinet_title: result.title,
      max_user: result.max_user,
      status: result.status,
      section: result.section,
      lent_info: result.lent
        ? result.lent.map((l) => ({
            user_id: l.user.user_id,
            intra_id: l.user.intra_id,
            lent_id: l.lent_id,
            lent_time: l.lent_time,
            expire_time: l.expire_time,
          }))
        : [],
    };
  }

  async updateCabinetStatus(
    cabinet_id: number,
    status: CabinetStatusType,
  ): Promise<void> {
    await this.cabinetRepository
      .createQueryBuilder(this.updateCabinetStatus.name)
      .update()
      .set({
        status,
      })
      .where({
        cabinet_id,
      })
      .execute();
  }

  async updateLentType(
    cabinet_id: number,
    lent_type: LentType,
  ): Promise<void> {
    await this.cabinetRepository
      .createQueryBuilder(this.updateLentType.name)
      .update()
      .set({
        lent_type,
      })
      .where({
        cabinet_id,
      })
      .execute();
  }

  async updateStatusNote(cabinet_id: number, status_note: string): Promise<void> {
    await this.cabinetRepository
      .createQueryBuilder(this.updateLentType.name)
      .update()
      .set({
        status_note,
      })
      .where({
        cabinet_id,
      })
      .execute();
  }

  async updateCabinetTitle(cabinet_id: number, title: string): Promise<void> {
    await this.cabinetRepository
      .createQueryBuilder(this.updateCabinetTitle.name)
      .update()
      .set({
        title,
      })
      .where({
        cabinet_id,
      })
      .execute();
  }

  async cabinetIsLent(cabinet_id: number): Promise<boolean> {
    const result = await this.cabinetRepository.findOne({
      relations: {
        lent: true,
      },
      where: {
        cabinet_id,
      }
    });
    return result.lent.length === 0 ? false : true;
  }
  
  async isCabinetExist(cabinet_id: number): Promise<boolean> {
    const result = await this.cabinetRepository.findOne({
      where: {
        cabinet_id,
      },
    });
    return result === undefined ? false : true;
  }
}
