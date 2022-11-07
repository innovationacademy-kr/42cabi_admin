import { LentCabinetDataDto } from "../dto/lent.cabinet.data.dto";
import { LentDto } from "../dto/lent.dto";
import { UserDto } from "../../user/dto/user.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILentRepository {
  /**
   * 해당 캐비넷이 존재하는지 확인합니다.
   * @param cabinet_id
   */
  isCabinetExist(cabinet_id: number): Promise<boolean>;

  /**
   * 사용자가 사물함을 대여중인지 아닌지를 반환합니다.
   * @param user_id
   * @return boolean
   */
   getIsLent(user_id: number): Promise<boolean>;

  /**
   * 사물함을 빌리기 전 사물함에 대한 최소한의 정보를 가져옴.
   * @param cabinet_id
   * @return LentCabinetDataDto
   **/
  getLentCabinetData(cabinet_id: number): Promise<LentCabinetDataDto>;

  /**
   * 특정 user_id로 해당 캐비넷 대여를 시도합니다.
   * 대여에 성공하면 void를 반환합니다.
   * @param cabinet_id
   * @param user_id
   * @return void
   */
  lentCabinet(cabinet_id: number, User: UserDto): Promise<LentDto>;

  /**
   * cabinet_id 대응하는 lent들의 expire_time을 설정합니다.
   * @param cabinet_id
   * @param expire_time
   * @return void
   */
  setExpireTimeAll(cabinet_id: number, expire_time: Date): Promise<void>;

  /**
   * lent_id에 해당하는 row를 expire_time을 설정합니다.
   * @param lent_id
   * @param expire_time
   * @return void
   */
   setExpireTime(lent_id: number, expire_time: Date): Promise<void>;

  /**
   * 해당 user_id로 대여중인 Cabinet id를 반환합니다.
   * 실패 시,
   * @param user_id
   * @return number
   */
  getLentCabinetId(user_id: number): Promise<number>;
}
