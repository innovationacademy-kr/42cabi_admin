import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!this.validateRequest(request)) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private validateRequest(request: Request): boolean {
    if (!request.headers.authorization) {
      return false;
    }

    const jwtString = request.headers.authorization.split('Bearer ')[1];

    return this.authService.verify(jwtString);
  }
}
