import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthenticationPostgresRepository } from '@/modules/auth/repository';
import { AuthenticationRepository } from '@/domain/repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationPostgresRepository,
    },
  ],
})
export class AuthModule {}
