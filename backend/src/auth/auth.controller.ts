import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BlockedUserDto } from 'src/user/dto/blocked-user.dto';
import { UserService } from 'src/user/user.service';
import { JWTAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PostLoginDto } from './dto/post-login.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  async postLogin(
    @Body(new ValidationPipe()) postLoginDto: PostLoginDto,
  ): Promise<{ accessToken }> {
    this.logger.log('call postLogin()');
    const valid = await this.authService.validateUser(
      postLoginDto.id,
      postLoginDto.password,
    );

    if (!valid) {
      throw new ForbiddenException();
    }

    const accessToken = this.authService.sign(postLoginDto.id);
    return { accessToken };
  }

  //FIXME: 인증/인가 관련 기능보단 밴된 유저를 가져오는 기능으로 보이는데, 별도의 모듈로 이관하는 것이 좋을 거 같습니다.
  @UseGuards(JWTAuthGuard)
  @Get('/ban')
  async getBanUser(): Promise<BlockedUserDto[]> {
    return this.userService.getBanUser();
  }
}
