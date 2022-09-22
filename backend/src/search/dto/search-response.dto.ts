import { LentDto } from './search-lent.dto';
import { LentLogDto } from './search-lentlog.dto';

/**
   검색 정보를 나타내는 DTO입니다.
 */
export class SearchResponseDto {
  resultFromLent: LentDto[];
  resultFromLentLog: LentLogDto[];
}
