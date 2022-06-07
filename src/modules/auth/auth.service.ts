import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '@/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { User } from '@/domain/entity';
import { UserDto } from '@/modules/user/model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not exist');
    }

    if (user && bcrypt.compareSync(pass, user.password)) {
      return new UserDto({ ...user });
    }
    return null;
  }

  async login(user: User) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
