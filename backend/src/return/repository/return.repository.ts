import { InjectRepository } from '@nestjs/typeorm';
import { CabinetDto } from '../dto/cabinet.dto';
import { IReturnRepository } from './return.repository.interface';
import { Repository } from 'typeorm';
import Cabinet from 'src/entities/cabinet.entity';
import Lent from 'src/entities/lent.entity';
import LentLog from 'src/entities/lent.log.entity';

export class ReturnRepository implements IReturnRepository {
  constructor(
    @InjectRepository(Cabinet) private cabinetRepository: Repository<Cabinet>,
  ) {}

  async getCabinet(cabinetIdx: number): Promise<CabinetDto> {
    const result = await this.cabinetRepository.findOne({
      relations: {
        lent: {
          user: true,
        },
      },
      where: {
        cabinet_id: cabinetIdx,
      },
    });
    if (result === null || result.lent.length === 0) {
      return null;
    }
    const rtn = {
      cabinet_id: result.cabinet_id,
      cabinet_num: result.cabinet_num,
      location: result.location,
      floor: result.floor,
      section: result.section,
      activation: result.status !== 'BROKEN' ? 0 : 1,
      lent_id: result.lent[0].lent_id,
      lent_cabinet_id: result.lent[0].lent_cabinet_id,
      lent_user_id: result.lent[0].lent_user_id,
      lent_time: result.lent[0].lent_time,
      expire_time: result.lent[0].expire_time,
      extension: 0, //  NOTE: 무슨 필드?
      user_id: result.lent[0].user.user_id,
      intra_id: result.lent[0].user.intra_id,
      auth: result.lent[0].user.state === 'NORMAL' ? 1 : 0,
      email: result.lent[0].user.email,
      phone: '010-123-4567', //  NOTE: 삭제 필요
      firstLogin: result.lent[0].user.first_login,
      lastLogin: result.lent[0].user.last_login,
    };
    return rtn;
  }

  // NOTE: 내부에서 콜백함수를 받는 트랜잭션 함수는 내부 코드를 트랜잭션으로 감싸며 에러 쓰로잉시 롤백합니다.
  async returnCabinet(cabinetIdx: number): Promise<boolean> {
    return await this.cabinetRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const userLentInfo = await transactionalEntityManager.findOne(Cabinet, {
          relations: {
            lent: {
              user: true,
            },
          },
          where: {
            cabinet_id: cabinetIdx,
          },
        });
        if (userLentInfo === null || userLentInfo.lent.length === 0) {
          return false;
        }
        await transactionalEntityManager.delete(Lent, userLentInfo.lent);
        const lentLogs = userLentInfo.lent.map((lent) => ({
          log_user_id: lent.lent_user_id,
          log_intra_id: lent.user.intra_id,
          log_cabinet_id: lent.lent_cabinet_id,
          lent_time: lent.lent_time,
          return_time: new Date(),
        }));
        await transactionalEntityManager.insert(LentLog, lentLogs);
        return true;
      },
    );
  }
}
