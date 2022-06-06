import { Module } from '@nestjs/common';

import { AppController } from '@/app.controller';
import { UserModule } from '@/modules/user';
import { CounterModule } from '@/modules/counter';
import { AuthModule } from '@/modules/auth';

@Module({
  imports: [UserModule, CounterModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
