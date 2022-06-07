import { Module } from '@nestjs/common';

import { AppController } from '@/app.controller';
import { CounterModule } from '@/modules/counter';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { CommonModule } from '@/modules/common/common.module';

@Module({
  imports: [AuthModule, CounterModule, CommonModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
