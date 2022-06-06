import { CountAccessNumberRepository } from '@/domain/repository';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('counter')
export class CounterController {
  constructor(private readonly countAccessRepo: CountAccessNumberRepository) {}

  @Get()
  getCount() {
    return this.countAccessRepo.getAccessNumber();
  }

  @Post()
  incrementCount() {
    return this.countAccessRepo.incrementAccessNumber();
  }
}
