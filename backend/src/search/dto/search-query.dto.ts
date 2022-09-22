import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * search api query 정보를 나타내는 DTO입니다.
 */
export class QueryDto {
  @IsOptional()
  @IsString()
  intraId: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  floor: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cabinetNum: number;
}
