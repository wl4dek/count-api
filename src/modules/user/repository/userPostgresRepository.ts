import env from '@/config/env';
import { User } from '@/domain/entity';
import { UserRepository } from '@/domain/repository';
import { dbClient } from '@/infra/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class UserPostgresRepository extends UserRepository {
  constructor() {
    super();
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.security.saltRounds);
  }

  async create(user: User): Promise<User> {
    user.password = await this.hash(user.password);

    const userCreated = await dbClient.user.create({
      data: {
        ...user,
      },
    });

    return userCreated;
  }

  async get(id: string): Promise<User> {
    const userFound = await dbClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }

  async getByEmail(email: string): Promise<User> {
    const userFound = await dbClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFound) {
      throw new Error('User not found');
    }

    return userFound;
  }
}
