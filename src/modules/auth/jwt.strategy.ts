import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import env from '@/config/env';
import { JWT } from '@/domain/entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.security.constant,
    });
  }

  async validate(payload: any): Promise<JWT> {
    return { userId: payload.sub, name: payload.name };
  }
}
