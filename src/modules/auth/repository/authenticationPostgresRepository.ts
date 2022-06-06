import { AuthenticationRepository } from '@/domain/repository';
import { dbClient } from '@/infra/database';
import { UserDto } from '@/modules/user/model';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationPostgresRepository extends AuthenticationRepository {
  async comparePassword(password: string, hash_password: string): Promise<boolean> {
    return bcrypt.compare(password, hash_password);
  }

  async authentication(email: string, password: string): Promise<UserDto> {
    const user = await dbClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Not find user');
    }

    const authenticated = await this.comparePassword(password, user.password);
    if (!authenticated) {
      throw new Error(`Wrong password`);
    }
    return user;
  }
}
