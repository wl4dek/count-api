import { UserDto } from '@/modules/user/model';

export abstract class AuthenticationRepository {
  abstract authentication(email: string, password: string): Promise<UserDto>;
  abstract comparePassword(password: string, hash_password: string): Promise<boolean>;
}
