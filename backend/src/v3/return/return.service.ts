import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import LentType from 'src/enums/lent.type.enum';
import { CabinetService } from 'src/v3/cabinet/cabinet.service';
import { UserDto } from '../lent/dto/user.dto';
import { LentTools } from '../lent/lent.component';
import { IReturnRepository } from './repository/return.repository.interface';
import { ReturnTools } from './return.component';

@Injectable()
export class ReturnService {
  private logger = new Logger(ReturnService.name);

  constructor(
    @Inject('IReturnRepository') private returnRepository: IReturnRepository,
    private cabinetService: CabinetService,
    private lentTools: LentTools,
    @Inject(forwardRef(() => ReturnTools))
    private returnTools: ReturnTools,
  ) {}

  async returnUserCabinet(user_id: number): Promise<void> {
    this.logger.debug(`Called ${ReturnService.name} ${this.returnUserCabinet.name}`);
    try {
      // 유저가 존재하는지 확인
      // FIXME: User 모듈에서 가져와서 사용하는게 더 좋을듯합니다.
      const user = await this.returnRepository.getUserIfExist(user_id);
      if (!user) {
        throw new HttpException(
          `🚨 해당 유저가 존재하지 않습니다. 🚨`,
          HttpStatus.NOT_FOUND,
        );
      }
      // 1. 해당 유저가 대여중인 cabinet_id를 가져온다.
      const cabinet_id = await this.lentTools.getLentCabinetId(
        user.user_id,
      );
      if (cabinet_id === null) {
        throw new HttpException(
          `${user.intra_id} doesn't lent cabinet!`,
          HttpStatus.FORBIDDEN,
        );
      }
      const lent = await this.returnTools.returnStateTransition(
        cabinet_id,
        user,
      );
      // 4. Lent Log Table에서 값 추가.
      // FIXME: 어느 모듈에 넣어야할 지 되게 애매하네요 ㅠㅠ (lent, return, log)
      await this.returnRepository.addLentLog(lent, user, cabinet_id);
    } catch (err) {
      throw err;
    }
  }

  async returnCabinet(cabinet_id: number): Promise<void> {
    this.logger.debug(`Called ${ReturnService.name} ${this.returnCabinet.name}`);
    try {
      const users = await this.returnRepository.getUsersByCabinetId(cabinet_id);
      if (users === null) {
        throw new HttpException(
          `🚨 해당 캐비넷을 대여중인 유저가 없습니다. 🚨`,
          HttpStatus.BAD_REQUEST,
        );
      }
      for await (const user_id of users) {
        await this.returnUserCabinet(user_id);
      }
    } catch (err) {
      throw err;
    }
  }

  async returnBundle(users: number[], cabinets: number[]): Promise<void> {
    this.logger.debug(`Called ${ReturnService.name} ${this.returnBundle.name}`);
    if (users) {
      const failures = []
      for await (const user_id of users) {
        await this.returnUserCabinet(user_id)
        .catch(() => {
          failures.push(user_id);
        })
      }
      if (failures.length !== 0) {
        throw new HttpException(
        { "user_failures": failures },
        HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (cabinets) {
      const failures = []
      for await (const cabinet_id of cabinets) {
        await this.returnCabinet(cabinet_id)
        .catch(() => {
          failures.push(cabinet_id);
        })
      }
      if (failures.length !== 0) {
        throw new HttpException(
        { "cabinet_failures": failures },
        HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
