import { UserDto } from '../dtos/user.dto';
import { Endereco } from '../endereco';
import { User } from '../user';

export class UserFactory {
  static async MapToUserDto(user: User, id: string = null): Promise<UserDto> {
    const userDto = new UserDto();
    userDto.nome = user.nome;
    userDto.email = user.email;
    userDto.senha = user.senha;
    userDto.endereco = user.endereco;

    if (id) {
      userDto.id = id;
    }

    return userDto;
  }

  static async MapToUser(userDto: UserDto, id: string = null): Promise<User> {
    const user = new User();
    user.nome = userDto.nome;
    user.email = userDto.email;
    user.senha = userDto.senha;
    user.endereco = userDto.endereco;

    if (id) {
      user._id = id;
    }

    return user;
  }
}
