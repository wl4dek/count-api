import { User } from '@/domain/entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract get(id: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract hash(password: string): Promise<string>;
}
