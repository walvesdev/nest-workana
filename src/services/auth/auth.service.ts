import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../models/dtos/user.dto';
import { Crypt } from '../utils/crypt';
import { User } from '../../models/user';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService) {
  }

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findByEmailPassword({
      email,
      senha,
    } as User);
    if (user && user.senha === (await Crypt.Encrypt(senha))) {
      return user;
    }
    return null;
  }

  async login(user: UserDto) {
    const userValid = await this.validateUser(user.email, user.senha);
    const payload = { email: userValid?.email, sub: userValid?.id };
    let token = this.jwtService.sign(payload);
    return {
      token: token,
    };
  }
}
