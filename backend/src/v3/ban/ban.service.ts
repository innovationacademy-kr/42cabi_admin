import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Lent from "src/entities/lent.entity";
import { IsolationLevel, Propagation, Transactional } from "typeorm-transactional";
import { IBanRepository } from "./repository/ban.repository.interface";

@Injectable()
export class BanService {
  private logger = new Logger(BanService.name);

  constructor(
    @Inject('IBanRepository')
    private banRepository: IBanRepository,
  ) {}

  /**
   * 날짜 차이 계산
   * @param begin
   * @param end
   * @returns days
   */
   calDateDiff(begin: Date, end: Date): number {
    this.logger.debug(`Called ${BanService.name} ${this.calDateDiff.name}`);
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    const endDay = end.getDate();

    const beginYear = begin.getFullYear();
    const beginMonth = begin.getMonth();
    const beginDay = begin.getDate();

    const newEnd = new Date(endYear, endMonth, endDay);
    const newBegin = new Date(beginYear, beginMonth, beginDay);

    const diffDatePerSec = newEnd.getTime() - newBegin.getTime();
    const days = Math.ceil(diffDatePerSec / 1000 / 60 / 60 / 24);
    return days;
  }

  /**
   * 유저의 누적 연체일을 계산
   * @param user_id
   */
   @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async addOverdueDays(user_id: number): Promise<number> {
    this.logger.debug(`Called ${BanService.name} ${this.addOverdueDays.name}`);
    const banLog = await this.banRepository.getBanLogByUserId(user_id);
    let accumulate = 0;
    for (const log of banLog) {
      if (log.is_penalty == false)
        accumulate += this.calDateDiff(
          log.banned_date,
          log.unbanned_date,
        );
    }
    return accumulate;
  }

  /**
   * 해당 유저에게 ban_day만큼 밴을 부가.
   * @param user_id
   * @param ban_day
   */
   @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  async blockingUser(
    lent: Lent,
    ban_day: number,
    is_penalty: boolean,
  ): Promise<void> {
    this.logger.debug(`Called ${BanService.name} ${this.blockingUser.name}`);
    // 1. Today + ban_day 만큼 unbanned_date주어 ban_log 테이블에 값 추가.
    await this.banRepository.addToBanLogByUserId(lent, ban_day, is_penalty);
  }
}
