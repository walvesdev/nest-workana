import { Get, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth/auth.service';
import { AllowAnonymous } from '../services/utils/constants';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @Get()
  root(@Res() res: Response) {
    return res.render('index.hbs', { message: '/' });
  }
}
