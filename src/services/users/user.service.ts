import { Injectable } from '@nestjs/common';
import { User } from '../../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../../models/dtos/user.dto';
import { Crypt } from '../utils/crypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    userDto.senha = await Crypt.Encrypt(userDto.senha);
    const createdCat = new this.userModel(userDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async findByEmailPassword(user: UserDto): Promise<any | undefined> {
    return await this.userModel
      .findOne(
        {},
        { email: user.email, senha: await Crypt.Encrypt(user.senha) },
      )
      .exec();
  }

  async update(user: UserDto) {
    return this.userModel.findByIdAndUpdate(user._id, user).exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async seed() {
    const user: User = {
      email: 'email@email.com',
      nome: 'User Master',
      senha: '123456',
      endereco: {
        rua: 'rua 1',
        bairro: 'Bairro 2',
        numero: '122',
        cidade: 'Brasilia',
        estado: 'DF',
        cep: '72000000',
      },
    };

    const usersDb = await this.findByEmailPassword(user as UserDto);

    if (!!usersDb) {
      return;
    }

    await this.create(user as UserDto);
  }
}
