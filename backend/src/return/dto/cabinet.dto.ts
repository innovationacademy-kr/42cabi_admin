/**
 * 캐비넷의 대여 정보를 나타내는 DTO입니다.
 */
export class CabinetDto {
  cabinet_id: number;
  cabinet_num: number;
  location: string;
  floor: number;
  section: string;
  activation: number;
  lent_id: number;
  lent_cabinet_id: number;
  lent_user_id: number;
  lent_time: Date;
  expire_time: Date;
  extension: number;
  user_id: number;
  intra_id: string;
  auth: number;
  email: string;
  phone: string;
  firstLogin: Date;
  lastLogin: Date;
}
