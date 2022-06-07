import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from '@/modules/auth/local-auth.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/modules/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiTags('Health')
  @ApiOperation({
    summary: 'Check heath of service',
  })
  @Get('/health')
  healthCheck() {
    return {
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @ApiTags('Login')
  @ApiOperation({
    summary: 'Authentication user',
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
