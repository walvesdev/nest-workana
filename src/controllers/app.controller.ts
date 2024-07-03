import { Get, Controller, Response } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AllowAnonymous } from '../services/utils/constants';

@Controller()
export class AppController {
  constructor(private userervice: AuthService) {}

  @AllowAnonymous()
  @Get("/")
  root(@Response() res) {
    return res.view('home.hbs');
  }
}
