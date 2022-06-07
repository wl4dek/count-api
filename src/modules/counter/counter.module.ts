import { Module } from '@nestjs/common';

import { CountAccessNumberRepository } from '@/domain/repository';
import { CountAccessPostgresRepository } from '@/modules/counter/repository';
import { CounterController } from '@/modules/counter/counter.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CounterController],
  providers: [
    {
      provide: CountAccessNumberRepository,
      useClass: CountAccessPostgresRepository,
    },
  ],
})
export class CounterModule {}
