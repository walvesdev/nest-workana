
export class CreateUserDto {
  email: string;
  nome: string;
  senha: string;
  rua: string;
  bairro: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
}

export class UpdateUserDto extends CreateUserDto {
  id: string;
}
