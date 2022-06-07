import { JWT } from '@/domain/entity';
import { CountAccessNumberRepository } from '@/domain/repository';
import { Controller, Get, HttpException, HttpStatus, Patch, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Counter')
@Controller('counter')
export class CounterController {
  constructor(private readonly countAccessRepo: CountAccessNumberRepository) {}

  @Get()
  @ApiOperation({
    summary: 'Get user access number',
  })
  getCount(@Req() request: Request) {
    const { userId } = request.user as JWT;
    return this.countAccessRepo.getAccessNumber(userId);
  }

  @Patch()
  @ApiOperation({
    summary: 'Increment user access',
  })
  incrementCount(@Req() request: Request) {
    const { userId } = request.user as JWT;
    try {
      return this.countAccessRepo.incrementAccessNumber(userId);
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
