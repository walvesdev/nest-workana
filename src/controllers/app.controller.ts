import { Get, Controller, Res, Post,Request, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../services/app/app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('index.hbs', { message: 'Hello world!sssss' });
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
