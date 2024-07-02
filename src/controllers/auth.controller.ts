import { Get, Controller, Post, Request, Body, HttpCode } from '@nestjs/common';
import { AllowAnonymous } from '../services/utils/constants';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @HttpCode(200)
  @Post('auth/login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @HttpCode(200)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }
}
