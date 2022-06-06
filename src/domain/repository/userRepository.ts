import { User, UserOut } from '@/domain/entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<UserOut>;
  abstract get(id: string): Promise<UserOut>;
  abstract hash(password: string): Promise<string>;
}
