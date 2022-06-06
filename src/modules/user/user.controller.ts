import { UserRepository } from '@/domain/repository';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserDto } from '@/modules/user/model';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    const user = this.userRepository.get(id) as Promise<UserDto>;
    return user;
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    const user = this.userRepository.create(userDto) as Promise<UserDto>;
    return user;
  }
}
