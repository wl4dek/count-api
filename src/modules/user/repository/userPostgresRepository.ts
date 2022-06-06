import env from '@/config/env';
import { User } from '@/domain/entity';
import { UserRepository } from '@/domain/repository';
import { dbClient } from '@/infra/database';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserDto } from '@/modules/user/model';

@Injectable()
export class UserPostgresRepository extends UserRepository {
  constructor() {
    super();
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.security.saltRounds);
  }

  async create(user: User): Promise<UserDto> {
    user.password = await this.hash(user.password);

    const userCreated = await dbClient.user.create({
      data: {
        ...user,
      },
    });

    return userCreated;
  }

  async get(id: string): Promise<UserDto> {
    const userFound = await dbClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new Error('User not found');
    }

    return new UserDto({ ...userFound });
  }
}
