import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app/app.service';
import { AuthModule } from './auth.module';
import { APP_GUARD, ModuleRef } from '@nestjs/core';
import { JwtAuthGuard } from '../services/utils/security/guards/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/users/user.service';
import { UsersModule } from './users.module';
import { AlsModule } from './als.module';
import { AsyncLocalStorage } from 'async_hooks';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    AlsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest-workana'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private userService: UserService, private readonly als: AsyncLocalStorage<any>) {}
  
  async onModuleInit() {
    await this.userService.seed();
  }
}
