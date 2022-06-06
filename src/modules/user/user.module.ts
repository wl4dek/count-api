import { Module } from '@nestjs/common';

import { UserController } from '@/modules/user/user.controller';
import { UserPostgresRepository } from '@/modules/user/repository';
import { UserRepository } from '@/domain/repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPostgresRepository,
    },
  ],
})
export class UserModule {}
