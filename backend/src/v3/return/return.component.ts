import { Inject, Injectable, Logger } from '@nestjs/common';
import Lent from 'src/entities/lent.entity';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import {
  IsolationLevel,
  Propagation,
  runOnTransactionComplete,
  Transactional,
} from 'typeorm-transactional';
import { BanService } from '../ban/ban.service';
import { CabinetService } from '../cabinet/cabinet.service';
import { UserDto } from '../user/dto/user.dto';
import { IReturnRepository } from './repository/return.repository.interface';

@Injectable()
export class ReturnTools {
  private logger = new Logger(ReturnTools.name);
  constructor(
    @Inject('IReturnRepository')
    private returnRepository: IReturnRepository,
    private cabinetService: CabinetService,
    private banService: BanService,
  ) {}

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async clearCabinetInfo(cabinet_id: number): Promise<void> {
    this.logger.debug(
      `Called ${ReturnTools.name} ${this.clearCabinetInfo.name}`,
    );
    await this.returnRepository.clearCabinetInfo(cabinet_id);
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async returnStateTransition(
    cabinet_id: number,
    user: UserDto,
  ): Promise<Lent> {
    this.logger.debug(
      `Called ${ReturnTools.name} ${this.returnStateTransition.name}`,
    );
    // 대여하고 있는 유저들의 대여 정보를 포함하는 cabinet 정보를 가져옴.
    // 가져오는 정보 : 캐비넷 상태, 캐비넷 대여타입, 캐비넷을 빌린 사람들의 인원 수
    const cabinet = await this.returnRepository.getReturnCabinetData(
      cabinet_id,
    );
    const lent = cabinet.lents.filter(
      (lent) => lent.lent_user_id === user.user_id,
    )[0];
    const lent_count = cabinet.lents.length;
    // 2. cabinet_status에 따라 처리.
    switch (cabinet.status) {
      case CabinetStatusType.AVAILABLE:
        if (lent_count - 1 === 0) {
          await this.clearCabinetInfo(cabinet_id);
        }
        break;
      case CabinetStatusType.SET_EXPIRE_FULL:
        await this.cabinetService.updateCabinetStatus(
          cabinet_id,
          CabinetStatusType.SET_EXPIRE_AVAILABLE,
        );
      case CabinetStatusType.SET_EXPIRE_AVAILABLE:
        if (lent_count - 1 === 0) {
          await this.cabinetService.updateCabinetStatus(
            cabinet_id,
            CabinetStatusType.AVAILABLE,
          );
          await this.clearCabinetInfo(cabinet_id);
        }
        break;
      case CabinetStatusType.BANNED:
      case CabinetStatusType.EXPIRED:
        const overdue = this.banService.calDateDiff(
          lent.expire_time,
          new Date(),
        );
        const cumulative = await this.banService.addOverdueDays(user.user_id);
        await this.banService.blockingUser(lent, overdue + cumulative, false);
        if (
          cabinet.status === CabinetStatusType.EXPIRED &&
          lent_count - 1 === 0
        ) {
          await this.cabinetService.updateCabinetStatus(
            cabinet_id,
            CabinetStatusType.AVAILABLE,
          );
        }
        break;
    }
    // 3. Lent Table에서 값 제거.
    await this.returnRepository.deleteLentByLentId(lent.lent_id);
    runOnTransactionComplete((err) => err && this.logger.error(err));
    return lent;
  }
}
