import {
  Get,
  Controller,
  Res,
  Post,
  Request,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AllowAnonymous } from '../services/utils/constants';
import { AuthService } from '../services/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @HttpCode(200)
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
