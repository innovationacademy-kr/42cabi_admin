import { ApiProperty } from "@nestjs/swagger";

export class ReturnBundleFailedResponseDto {
  @ApiProperty({
    description: '처리에 실패한 user_id 배열',
    example: [1000000000, -5],
    required: false,
  })
  user_failures?: number[];

  @ApiProperty({
    description: '처리에 실패한 cabinet_id 배열',
    example: [1000000000, -4],
    required: false,
  })
  cabinet_failures?: number[];
}
