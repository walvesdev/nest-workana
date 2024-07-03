import { Injectable } from '@nestjs/common';
import { User } from '../../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { Crypt } from '../utils/crypt';
import { UserFactory } from '../../models/factories/user.factory';
import { UserDto } from '../../models/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async create(userDto: any): Promise<User> {
    userDto.senha = await Crypt.Encrypt(userDto.senha);
    const createdCat = new this.userModel(userDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<any | undefined> {
    if (id) {
      const user = await this.userModel.findById(id).exec();
      return await UserFactory.MapToUserDto(user, id);
    }
    return null;
  }

  async findByEmailPassword(user: UserDto): Promise<any | undefined> {
    return await this.userModel
      .findOne(
        {},
        { email: user.email, senha: await Crypt.Encrypt(user.senha) },
      )
      .exec();
  }

  async update(user: User) {
    return this.userModel
      .findByIdAndUpdate(user._id, user, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async seed() {
    //@ts-ignore
    const user: UserDto = {
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

    const usersDb = await this.findByEmailPassword(user);

    if (!!usersDb) {
      return;
    }

    await this.create(user);
  }
}
