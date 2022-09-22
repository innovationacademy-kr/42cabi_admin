import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 *  사물함 상태 변경에 사용되는 인자를 나타내는 DTO입니다.
 */
export class PatchActivationDto {
  @IsNumber()
  @IsNotEmpty()
  cabinetIdx: number;

  @IsNumber()
  @IsNotEmpty()
  activation: number;

  @IsString()
  reason: string;
}
