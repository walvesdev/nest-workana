import { Module } from '@nestjs/common';
import { UserService } from '../services/users/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user';
import { UserController } from '../controllers/user.controller';
import { AuthService } from '../services/auth/auth.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
