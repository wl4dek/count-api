import { UserRepository } from '@/domain/repository';
import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    return this.userRepository.get(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
