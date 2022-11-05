import { ApiProperty } from "@nestjs/swagger";

export class ReturnBundleDataDto {
  @ApiProperty({
    description: 'user_id 배열',
    default: [],
    required: false,
  })
  users: number[];

  @ApiProperty({
    description: 'cabinet_id 배열',
    default: [],
    required: false,
  })
  cabinets: number[];
}
