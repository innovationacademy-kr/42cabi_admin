import { InjectRepository } from '@nestjs/typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import Lent from 'src/entities/lent.entity';
import LentLog from 'src/entities/lent.log.entity';
import User from 'src/entities/user.entity';
import { UserDto } from 'src/v3/lent/dto/user.dto';
import { Repository } from 'typeorm';
import { IsolationLevel, Propagation, Transactional } from 'typeorm-transactional';
import { ReturnCabinetDataDto } from '../dto/return.cabinet.data.dto';
import { IReturnRepository } from './return.repository.interface';

export class ReturnRepository implements IReturnRepository {
  constructor(
    @InjectRepository(Cabinet) private cabinetRepository: Repository<Cabinet>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Lent) private lentRepository: Repository<Lent>,
    @InjectRepository(LentLog) private lentLogRepository: Repository<LentLog>,
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

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async getReturnCabinetData(
    cabinet_id: number,
  ): Promise<ReturnCabinetDataDto> {
    const result = await this.cabinetRepository.find({
      relations: {
        lent: true,
      },
      select: {
        status: true,
        lent_type: true,
        lent: true,
      },
      where: {
        cabinet_id: cabinet_id,
      },
      lock: {
        mode: 'pessimistic_write',
      },
    });
    if (result.length === 0) {
      return null;
    }
    return {
      status: result[0].status,
      lent_type: result[0].lent_type,
      lents: result[0].lent,
    };
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async clearCabinetInfo(cabinet_id: number): Promise<void> {
    await this.cabinetRepository
      .createQueryBuilder()
      .update({
        title: null,
        memo: null,
      })
      .where({
        cabinet_id: cabinet_id,
      })
      .execute();
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async deleteLentByLentId(lent_id: number): Promise<void> {
    await this.lentRepository
      .createQueryBuilder(this.deleteLentByLentId.name)
      .delete()
      .from(Lent)
      .where({
        lent_id: lent_id,
      })
      .execute();
  }

  async addLentLog(
    lent: Lent,
    user: UserDto,
    cabinet_id: number,
  ): Promise<void> {
    await this.lentLogRepository
      .createQueryBuilder(this.addLentLog.name)
      .insert()
      .into(LentLog)
      .values({
        log_user_id: user.user_id,
        log_intra_id: user.intra_id,
        log_cabinet_id: cabinet_id,
        lent_time: lent.lent_time,
        return_time: new Date(),
      })
      .execute();
  }

  async getUsersByCabinetId(cabinet_id: number): Promise<number[]> {
    const result = await this.lentRepository.find({
      select: {
        lent_user_id: true,
      },
      where: {
        lent_cabinet_id: cabinet_id,
      }
    });
    if (result.length === 0) {
      return null;
    }
    return result.map((lent) => lent.lent_user_id);
  }
}
