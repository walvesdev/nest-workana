import { User } from '../user';
import { Endereco } from '../endereco';

export class UserDto {
  id?: string;
  email: string;
  nome: string;
  senha: string;
  endereco: Endereco;
}
