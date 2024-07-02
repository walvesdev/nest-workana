import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthService } from '../services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from '../services/auth/auth.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
