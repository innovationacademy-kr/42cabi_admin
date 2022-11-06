import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import LentType from 'src/enums/lent.type.enum';
import { CabinetService } from 'src/v3/cabinet/cabinet.service';
import { UserDto } from '../user/dto/user.dto';
import { LentTools } from '../lent/lent.component';
import { UserService } from '../user/user.service';
import { IReturnRepository } from './repository/return.repository.interface';
import { ReturnTools } from './return.component';

@Injectable()
export class ReturnService {
  private logger = new Logger(ReturnService.name);

  constructor(
    @Inject('IReturnRepository') private returnRepository: IReturnRepository,
    private userService: UserService,
    private lentTools: LentTools,
    @Inject(forwardRef(() => ReturnTools))
    private returnTools: ReturnTools,
  ) {}

  async returnUserCabinet(user_id: number): Promise<void> {
    this.logger.debug(`Called ${ReturnService.name} ${this.returnUserCabinet.name}`);
    try {
      // 유저가 존재하는지 확인
      const user = await this.userService.getUserIfExist(user_id);
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
    const user_failures = []
    const cabinets_failures = []
    if (users) {
      for await (const user_id of users) {
        await this.returnUserCabinet(user_id)
        .catch(() => {
          user_failures.push(user_id);
        })
      }
    }
    if (cabinets) {
      for await (const cabinet_id of cabinets) {
        await this.returnCabinet(cabinet_id)
        .catch(() => {
          cabinets_failures.push(cabinet_id);
        })
      }
    }
    if (!(user_failures.length === 0 && cabinets_failures.length === 0)) {
      throw new HttpException({
        "user_failures": user_failures,
        "cabinet_failures": cabinets_failures,
      }, HttpStatus.BAD_REQUEST,
      );
    }
  }
}
