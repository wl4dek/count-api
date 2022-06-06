import { Module } from '@nestjs/common';

import { CountAccessNumberRepository } from '@/domain/repository';
import { CountAccessMemoryRepository } from '@/modules/counter/repository/countAccessRepository';
import { CounterController } from '@/modules/counter/counter.controller';

@Module({
  imports: [],
  controllers: [CounterController],
  providers: [
    {
      provide: CountAccessNumberRepository,
      useClass: CountAccessMemoryRepository,
    },
  ],
})
export class CounterModule {}
