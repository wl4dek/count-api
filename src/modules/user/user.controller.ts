import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserDto } from '@/modules/user/model';
import { UserService } from './service/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JWT } from '@/domain/entity';
import { Public } from '@/modules/common';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get user by Id',
  })
  async getUser(@Req() request: Request): Promise<UserDto> {
    const { userId } = request.user as JWT;
    const user = await this.userService.findById(userId);
    return new UserDto({ ...user });
  }

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Create a new User',
  })
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    const user = await this.userService.create(userDto);
    return new UserDto({ ...user });
  }
}
