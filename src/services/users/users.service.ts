import { Injectable } from '@nestjs/common';
import { User } from '../../models/user';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      nome: 'john',
      senha: 'changeme',
    },
    {
      id: 2,
      nome: 'maria',
      senha: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.email === email) as User;
  }
}
