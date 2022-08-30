import { IsNotEmpty, IsString } from 'class-validator';

export class PostLoginDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
