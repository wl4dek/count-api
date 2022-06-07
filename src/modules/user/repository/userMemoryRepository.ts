import { User } from '@/domain/entity';
import { UserRepository } from '@/domain/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '@/modules/user/model';
import bcrypt from 'bcrypt';

import env from '@/config/env';

@Injectable()
export class UserMemoryRespository extends UserRepository {
  users: User[] = [
    {
      email: 'userExiste@email.com',
      name: 'user existe',
      password: 'userPassExist',
      id: '123uuid',
    },
  ];

  async create(user: User): Promise<UserDto> {
    user.password = await this.hash(user.password);
    this.users.push(user);
    return user;
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.security.saltRounds);
  }

  async getByEmail(email: string): Promise<User> {
    const userFound = this.users.filter((user: User) => user.email === email);
    if (userFound) {
      return userFound[0];
    }
    throw new NotFoundException('User not found');
  }

  async get(id: string): Promise<User> {
    const userFound = this.users.filter((user: User) => user.id === id);
    if (userFound) {
      return userFound[0];
    }
    throw new NotFoundException('User not found');
  }
}
