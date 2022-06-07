import { forwardRef, Module } from '@nestjs/common';

import { UserController } from '@/modules/user/user.controller';
import { UserPostgresRepository } from '@/modules/user/repository';
import { UserRepository } from '@/domain/repository';
import { UserService } from './service/user.service';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPostgresRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
