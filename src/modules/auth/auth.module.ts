import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/modules/user';
import { AuthService } from '@/modules/auth/auth.service';
import { LocalStrategy } from '@/modules/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import env from '@/config/env';
import { JwtStrategy } from '@/modules/auth/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: env.security.constant,
      signOptions: { expiresIn: '1h' },
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
