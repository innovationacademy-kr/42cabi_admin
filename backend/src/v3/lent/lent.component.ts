import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CabinetStatusType from 'src/enums/cabinet.status.type.enum';
import LentExceptionType from 'src/enums/lent.exception.enum';
import LentType from 'src/enums/lent.type.enum';
import {
  IsolationLevel,
  Propagation,
  runOnTransactionComplete,
  Transactional,
} from 'typeorm-transactional';
import { CabinetService } from '../cabinet/cabinet.service';
import { UserDto } from '../user/dto/user.dto';
import { ILentRepository } from './repository/lent.repository.interface';

@Injectable()
export class LentTools {
  private logger = new Logger(LentTools.name);
  constructor(
    @Inject('ILentRepository')
    private lentRepository: ILentRepository,
    private cabinetService: CabinetService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  /**
   * 처음으로 풀방이 되면 해당 사물함 이용자들의 만료시간을 설정해주는 함수.
   * @param cabinet_id
   * @param last_lent_time
   * @param lent_type
   */
  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async setExpireTimeAll(
    cabinet_id: number,
    last_lent_time: Date,
    lent_type: LentType,
  ): Promise<void> {
    this.logger.debug(`Called ${LentTools.name} ${this.setExpireTimeAll.name}`);
    const expire_time = new Date();
    if (lent_type === LentType.PRIVATE) {
      expire_time.setDate(
        last_lent_time.getDate() +
          this.configService.get<number>('lent_term.private'),
      );
    } else {
      expire_time.setDate(
        last_lent_time.getDate() +
          this.configService.get<number>('lent_term.share'),
      );
    }
    await this.lentRepository.setExpireTimeAll(cabinet_id, expire_time);
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async lentStateTransition(
    cabinet_id: number,
    user: UserDto,
  ): Promise<LentExceptionType> {
    this.logger.debug(
      `Called ${LentTools.name} ${this.lentStateTransition.name}`,
    );

    // 대여하고 있는 유저들의 대여 정보를 포함하는 cabinet 정보를 가져옴.
    // 가져오는 정보 : 캐비넷 상태, 캐비넷 대여타입, 캐비넷을 빌린 사람들의 인원 수
    let excepction_type = LentExceptionType.LENT_SUCCESS;
    const cabinet = await this.lentRepository.getLentCabinetData(cabinet_id);
    switch (cabinet.status) {
      case CabinetStatusType.AVAILABLE:
      case CabinetStatusType.SET_EXPIRE_AVAILABLE:
        // 동아리 사물함인지 확인
        if (cabinet.lent_type === LentType.CIRCLE) {
          excepction_type = LentExceptionType.LENT_CIRCLE;
          break;
        }
        // 대여 처리
        const new_lent = await this.lentRepository.lentCabinet(
          cabinet_id,
          user,
        );
        if (cabinet.lent_count + 1 === cabinet.max_user) {
          if (cabinet.status === CabinetStatusType.AVAILABLE) {
            // 해당 대여로 처음으로 풀방이 되면 만료시간 설정
            await this.setExpireTimeAll(
              cabinet_id,
              new_lent.lent_time,
              cabinet.lent_type,
            );
          } else {
            // 기존 유저의 만료시간으로 만료시간 설정
            await this.lentRepository.setExpireTime(
              new_lent.lent_id,
              cabinet.expire_time,
            );
          }
          // 상태를 SET_EXPIRE_FULL로 변경
          await this.cabinetService.updateCabinetStatus(
            cabinet_id,
            CabinetStatusType.SET_EXPIRE_FULL,
          );
        }
        break;

      case CabinetStatusType.SET_EXPIRE_FULL:
        excepction_type = LentExceptionType.LENT_FULL;
        break;

      case CabinetStatusType.EXPIRED:
        excepction_type = LentExceptionType.LENT_EXPIRED;
        break;

      case CabinetStatusType.BROKEN:
        excepction_type = LentExceptionType.LENT_BROKEN;
        break;

      case CabinetStatusType.BANNED:
        excepction_type = LentExceptionType.LENT_BANNED;
        break;
    }
    runOnTransactionComplete((err) => err && this.logger.error(err));
    return excepction_type;
  }

  async getLentCabinetId(user_id: number): Promise<number> {
    return await this.lentRepository.getLentCabinetId(user_id);
  }
}
