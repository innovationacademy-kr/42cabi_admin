import { InjectRepository } from "@nestjs/typeorm";
import BanLog from "src/entities/ban.log.entity";
import Lent from "src/entities/lent.entity";
import { Repository } from "typeorm";
import { IsolationLevel, Propagation, Transactional } from "typeorm-transactional";
import { IBanRepository } from "./ban.repository.interface";

export class BanRepository implements IBanRepository {
  constructor(
    @InjectRepository(BanLog) private banLogRepository: Repository<BanLog>,
  ) {}

  async getBanLogByUserId(user_id: number): Promise<BanLog[]> {
    return await this.banLogRepository.find({
      where: {
        ban_user_id: user_id,
      },
    });
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async addToBanLogByUserId(
    lent: Lent,
    ban_day: number,
    is_penalty: boolean,
  ): Promise<void> {
    const banned_date = new Date();
    const unbanned_date = new Date(banned_date.getTime());
    unbanned_date.setDate(banned_date.getDate() + ban_day);
    await this.banLogRepository
      .createQueryBuilder(this.addToBanLogByUserId.name)
      .insert()
      .into(BanLog)
      .values({
        ban_user_id: lent.lent_user_id,
        ban_cabinet_id: lent.lent_cabinet_id,
        banned_date,
        unbanned_date,
        is_penalty,
      })
      .execute();
  }
}
