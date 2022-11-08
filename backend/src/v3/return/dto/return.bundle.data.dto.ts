import { ApiProperty } from '@nestjs/swagger';

export class ReturnBundleDataDto {
  @ApiProperty({
    description: 'user_id 배열',
    example: [85330, 110804, 110819, 1000000000, -5],
    required: false,
  })
  users: number[];

  @ApiProperty({
    description: 'cabinet_id 배열',
    example: [1, 2, 3, 1000000000, -4],
    required: false,
  })
  cabinets: number[];
}
