import { randomUUID } from 'crypto';

export interface UserConstructor {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface UserOut {
  id?: string;
  name: string;
  email: string;
}

export class User implements UserConstructor {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor(user: UserConstructor) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;

    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
