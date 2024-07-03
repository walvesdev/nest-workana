import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    
    if (exception instanceof UnauthorizedException || status == 401){
      response.status(401).redirect('http://localhost:3000/login');
    }

    if (status == 403){
      response.status(403).redirect('http://localhost:3000/login');
    }
  }
}