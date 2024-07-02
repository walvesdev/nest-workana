import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { jwtConstants } from '../services/utils/constants';
import { LocalStrategy } from '../services/utils/security/strategy/local.strategy';
import { JwtStrategy } from '../services/utils/security/strategy/jwt.strategy';
import { AuthService } from '../services/auth/auth.service';
import { AuthController } from '../controllers/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
