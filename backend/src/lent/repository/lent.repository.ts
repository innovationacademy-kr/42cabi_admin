import { InjectRepository } from "@nestjs/typeorm";
import Lent from "src/entities/lent.entity";
import { ILentRepository } from "./lent.interface.repository";
import { Repository } from 'typeorm';
import { LentInfoDto } from "../dto/lent-info.dto";
import { OverdueInfoDto } from "../dto/overdue-info.dto";

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
        extension: lockerRentalUser[i].extension,
        intra_id: lockerRentalUser[i].user.intra_id,
      });
    }
    return lentInfo;
  }

  async getLentOverdue(): Promise<OverdueInfoDto[]> {
    const connection = await this.pool.getConnection();

    const content = `
    SELECT u.intra_id, c.floor, c.cabinet_num, l.lent_time,l.expire_time from lent l
    JOIN cabinet c
    ON c.cabinet_id = l.lent_cabinet_id
    JOIN user u
    ON u.user_id = l.lent_user_id
    WHERE c.cabinet_status='EXPIRED'
    ORDER BY l.expire_time;
    `;

    const results = await connection.query(content);
    connection.release();

    return results.map((result) => ({
      intra_id: result.intra_id,
      floor: result.floor,
      cabinet_num: result.cabinet_num,
      lent_time: result.lent_time,
      expire_time: result.expire_time,
    }));
  }
}
