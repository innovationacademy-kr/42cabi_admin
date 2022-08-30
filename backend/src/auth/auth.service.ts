import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string): Promise<boolean> {
    if (
      this.configService.get<string>('admin.id') === id &&
      this.configService.get<string>('admin.password') === password
    ) {
      return true;
    }
    return false;
  }

  sign(user: string): string {
    return this.jwtService.sign({ user });
  }

  verify(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
