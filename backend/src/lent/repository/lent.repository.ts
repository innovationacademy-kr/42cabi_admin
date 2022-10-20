import { InjectRepository } from "@nestjs/typeorm";
import Lent from "src/entities/lent.entity";
import { ILentRepository } from "./lent.interface.repository";
import { Repository } from 'typeorm';
import { LentInfoDto } from "../dto/lent-info.dto";
import { OverdueInfoDto } from "../dto/overdue-info.dto";
import CabinetStatusType from "src/enums/cabinet.status.type.enum";

export class LentRepository implements ILentRepository {
  constructor(
    @InjectRepository(Lent)
    private lentRepository: Repository<Lent>,
  ) {}

  async getLentInfo(): Promise<LentInfoDto[]> {
    const lockerRentalUser = await this.lentRepository.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          intra_id: true,
        },
        lent_id: true,
        lent_cabinet_id: true,
        lent_user_id: true,
        lent_time: true,
        expire_time: true,
      }
    });

    const lentInfo: LentInfoDto[] = [];
    for (let i = 0; i < lockerRentalUser.length; i += 1) {
      lentInfo.push({
        lent_id: lockerRentalUser[i].lent_id,
        lent_cabinet_id: lockerRentalUser[i].lent_cabinet_id,
        lent_user_id: lockerRentalUser[i].lent_user_id,
        lent_time: lockerRentalUser[i].lent_time,
        expire_time: lockerRentalUser[i].expire_time,
        extension: undefined,
        intra_id: lockerRentalUser[i].user.intra_id,
      });
    }
    return lentInfo;
  }

  async getLentOverdue(): Promise<OverdueInfoDto[]> {
    const results = await this.lentRepository.find({
      relations: {
        user: true,
        cabinet: true,
      },
      select: {
        user: {
          intra_id: true,
        },
        cabinet: {
          floor: true,
          cabinet_num: true,
        },
        lent_time: true,
        expire_time: true,
      },
      where: {
        cabinet: {
          status: CabinetStatusType.EXPIRED,
        },
      },
      order: {
        expire_time: 'ASC',
      },
    });

    return results.map((result) => ({
      intra_id: result.user.intra_id,
      floor: result.cabinet.floor,
      cabinet_num: result.cabinet.cabinet_num,
      lent_time: result.lent_time,
      expire_time: result.expire_time,
    }));
  }
}
