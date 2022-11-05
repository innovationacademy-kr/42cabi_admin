import Lent from "src/entities/lent.entity";
import { UserDto } from "src/v3/lent/dto/user.dto";
import { ReturnCabinetDataDto } from "../dto/return.cabinet.data.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReturnRepository {
  /**
   * 해당 유저가 존재하는지 확인합니다.
   * @param user_id
   */
  getUserIfExist(user_id: number): Promise<UserDto>;

  /**
   * 대여중인 사물함을 반납하기 위해 사물함에 대한 정보를 가져옴.
   * @param cabinet_id
   * @return ReturnCabinetDataDto
   **/
  getReturnCabinetData(cabinet_id: number): Promise<ReturnCabinetDataDto>;

  /**
   * cabinet title, memo를 null로 설정함.
   * @param cabinet_id
   */
  clearCabinetInfo(cabinet_id: number): Promise<void>;

  /**
   * user_id에 대응하는 Lent값을 삭제합니다.
   * 해당 Lent 값을 반환합니다.
   * @param user_id
   * @return void
   */
  deleteLentByLentId(lent_id: number): Promise<void>;

  /**
   * 기존 lent 정보를 lent log에 추가합니다.
   * @param Lent
   * @return void
   */
  addLentLog(lent: Lent, user: UserDto, cabinet_id: number): Promise<void>;

  /**
   * 해당 캐비넷을 대여중인 유저들의 user_id를 반환합니다.
   * @param cabinet_id
   */
  getUsersByCabinetId(cabinet_id: number): Promise<number[]>;
}
