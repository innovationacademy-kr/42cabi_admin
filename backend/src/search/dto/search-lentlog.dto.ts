/**
 * 캐비넷 대여 Log의 정보를 나타내는 DTO입니다.
 */
export class LentLogDto {
  intra_id: string;

  cabinet_id: number;

  cabinet_num: number;

  location: string;

  section: string;

  floor: number;

  activation: string;

  log_id: string;

  lent_time: Date;

  return_time: Date;
}
