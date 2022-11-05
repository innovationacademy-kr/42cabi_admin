import { InjectRepository } from "@nestjs/typeorm";
import Cabinet from "src/entities/cabinet.entity";
import Lent from "src/entities/lent.entity";
import User from "src/entities/user.entity";
import { Repository } from "typeorm";
import { IsolationLevel, Propagation, Transactional } from "typeorm-transactional";
import { LentCabinetDataDto } from "../dto/lent.cabinet.data.dto";
import { LentDto } from "../dto/lent.dto";
import { UserDto } from "../dto/user.dto";
import { ILentRepository } from "./lent.repository.interface";

export class LentRepository implements ILentRepository {
  constructor(
    @InjectRepository(Lent)
    private lentRepository: Repository<Lent>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
  ) {}

  async getUserIfExist(user_id: number): Promise<UserDto> {
    const result = await this.userRepository.findOne({
      where: {
        user_id: user_id,
      }
    })
    if (!result) {
      return null;
    }
    return {
      user_id: result.user_id,
      intra_id: result.intra_id,
    };
  }

  async isCabinetExist(cabinet_id: number): Promise<boolean> {
    const result = await this.cabinetRepository.findOne({
      where: {
        cabinet_id: cabinet_id,
      }
    })
    if (!result) {
      return false;
    }
    return true;
  }

  async getIsLent(user_id: number): Promise<boolean> {
    const result = await this.lentRepository.findOne({
      where: {
        lent_user_id: user_id,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async getLentCabinetData(cabinet_id: number): Promise<LentCabinetDataDto> {
    const result = await this.cabinetRepository
      .createQueryBuilder('c')
      .select(['c.cabinet_status', 'c.lent_type', 'c.max_user'])
      .leftJoin(Lent, 'l', 'l.lent_cabinet_id = c.cabinet_id')
      .addSelect('l.expire_time', 'expire_time')
      .addSelect('l.lent_id', 'lent_id')
      .where('c.cabinet_id = :cabinet_id', { cabinet_id })
      .setLock('pessimistic_write')
      .execute();

    return {
      status: result[0].cabinet_status,
      lent_type: result[0].c_lent_type,
      lent_count: result[0].lent_id === null ? 0 : result.length,
      expire_time:
        result[0].lent_id === null ? undefined : result[0].expire_time,
      max_user: result[0].c_max_user,
    };
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async lentCabinet(cabinet_id: number, user: UserDto): Promise<LentDto> {
    const lent_time = new Date();
    const expire_time: Date | null = null;
    const result = await this.lentRepository
      .createQueryBuilder(this.lentCabinet.name)
      .insert()
      .into(Lent)
      .values({
        lent_user_id: user.user_id,
        lent_cabinet_id: cabinet_id,
        lent_time: lent_time,
        expire_time: expire_time,
      })
      .execute();
    return {
      user_id: user.user_id,
      intra_id: user.intra_id,
      lent_id: result.identifiers.pop()['lent_id'],
      lent_time,
      expire_time,
      is_expired: false,
    };
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async setExpireTimeAll(cabinet_id: number, expire_time: Date): Promise<void> {
    expire_time.setHours(23, 59, 59, 999);
    await this.lentRepository
      .createQueryBuilder()
      .update(Lent)
      .set({
        expire_time: expire_time,
      })
      .where({
        lent_cabinet_id: cabinet_id,
      })
      .execute();
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async setExpireTime(lent_id: number, expire_time: Date): Promise<void> {
    expire_time.setHours(23, 59, 59, 999);
    await this.lentRepository
      .createQueryBuilder()
      .update(Lent)
      .set({
        expire_time: expire_time,
      })
      .where({
        lent_id: lent_id,
      })
      .execute();
  }

  async getLentCabinetId(user_id: number): Promise<number> {
    const result = await this.lentRepository.findOne({
      select: {
        lent_cabinet_id: true,
      },
      where: {
        lent_user_id: user_id,
      },
    });
    if (result === null) {
      return null;
    }
    return result.lent_cabinet_id;
  }
}
