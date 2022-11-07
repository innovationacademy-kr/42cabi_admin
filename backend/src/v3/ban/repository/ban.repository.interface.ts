import BanLog from 'src/entities/ban.log.entity';
import Lent from 'src/entities/lent.entity';

export interface IBanRepository {
  /**
   * user_id를 받아 유저의 ban log들을 반환.
   * @param user_id
   */
  getBanLogByUserId(user_id: number): Promise<BanLog[]>;

  /**
   * Today + ban_day 만큼 unbanned_date주어 ban_log 테이블에 값 추가.
   * @param lent
   * @param ban_day
   * @param is_penalty
   */
  addToBanLogByUserId(
    lent: Lent,
    ban_day: number,
    is_penalty: boolean,
  ): Promise<void>;
}
