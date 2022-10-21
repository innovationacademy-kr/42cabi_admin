import { BlockedUserDto } from '../dto/blocked-user.dto';

export interface IUserRepository {
  /**
   * ban 당한 유저들의 정보를 가져옵니다.
   *
   * @returns BlockedUserDto[]
   */
  getBanUser(): Promise<BlockedUserDto[]>;
}
