import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from '@/modules/auth/model';
import { AuthenticationRepository } from '@/domain/repository';

@Controller('auth')
export class AuthController {
  constructor(private readonly authRepo: AuthenticationRepository) {}

  @Post()
  login(@Body() authDto: AuthenticateDto) {
    const { email, password } = authDto;
    const user = this.authRepo.authentication(email, password);
    return user;
  }
}
