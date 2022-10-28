import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { ReturnService } from './return.service';

@ApiTags('(V3) Return')
@Controller({
  version: '3',
  path: 'return',
})
@UseGuards(JWTAuthGuard)
export class ReturnController {
  private logger = new Logger(ReturnController.name);

  constructor(private returnService: ReturnService) {}
}
