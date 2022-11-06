import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import LentExceptionType from 'src/enums/lent.exception.enum';
import { CabinetService } from '../cabinet/cabinet.service';
import { LentTools } from './lent.component';
import { ILentRepository } from './repository/lent.repository.interface';

@Injectable()
export class LentService {
  private logger = new Logger(LentService.name);

  constructor(
    @Inject('ILentRepository')
    private lentRepository: ILentRepository,
    private lentTools: LentTools,
    private cabinetService: CabinetService,
  ) {}

  async lentCabinet(cabinet_id: number, user_id: number): Promise<void> {
    this.logger.debug(`Called ${LentService.name} ${this.lentCabinet.name}`);
    try {
      // 유저가 존재하는지 확인
      // FIXME: User 모듈에서 각각 가져와서 사용하는게 더 좋을듯합니다.
      const user = await this.lentRepository.getUserIfExist(user_id);
      if (!user) {
        throw new HttpException(
          `🚨 해당 유저가 존재하지 않습니다. 🚨`,
          HttpStatus.NOT_FOUND,
        );
      }
      // 캐비넷이 존재하는지 확인
      if (!await this.cabinetService.isCabinetExist(cabinet_id)) {
        throw new HttpException(
          `🚨 해당 캐비넷이 존재하지 않습니다. 🚨`,
          HttpStatus.NOT_FOUND,
        );
      }
      // 유저가 대여한 사물함 확인
      if (await this.lentRepository.getIsLent(user_id)) {
        throw new HttpException(
          `🚨 해당 유저는 이미 대여중인 사물함이 있습니다 🚨`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const excepction_type = await this.lentTools.lentStateTransition(
        cabinet_id,
        user,
      );
      switch (excepction_type) {
        case LentExceptionType.LENT_CIRCLE:
          throw new HttpException(
            `🚨 해당 사물함은 동아리 전용 사물함입니다. 🚨`,
            HttpStatus.I_AM_A_TEAPOT,
          );
        case LentExceptionType.LENT_FULL:
          throw new HttpException(
            `🚨 해당 사물함에 잔여 자리가 없습니다 🚨`,
            HttpStatus.CONFLICT,
          );
        case LentExceptionType.LENT_EXPIRED:
          throw new HttpException(
            `🚨 연체된 사물함은 대여할 수 없습니다. 🚨`,
            HttpStatus.CONFLICT,
          );
        case LentExceptionType.LENT_BROKEN:
          throw new HttpException(
            `🚨 고장난 사물함은 대여할 수 없습니다. 🚨`,
            HttpStatus.CONFLICT,
          );
        case LentExceptionType.LENT_BANNED:
          throw new HttpException(
            '🚨 해당 사물함은 비활성화된 사물함입니다 🚨',
            HttpStatus.CONFLICT,
          );
      }
    } catch (err) {
      throw err;
    }
  }
}
