import { UserDto } from 'src/v3/user/dto/user.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository {
  /**
   * 해당 유저가 존재하는지 확인합니다.
   * 존재하면 해당 유저의 UserDto를 반환합니다.
   * @param user_id
   */
  getUserIfExist(user_id: number): Promise<UserDto>;
}
