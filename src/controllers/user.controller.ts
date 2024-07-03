import {
  Get,
  Controller,
  HttpCode,
  Post,
  Body,
  Response,
  Put,
  Param,
  Delete,
  Res, HttpException, HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/users/user.service';
import { User } from '../models/user';
import { UserDto } from '../models/dtos/user.dto';
import { AllowAnonymous } from '../services/utils/constants';
import { UserFactory } from '../models/factories/user.factory';

@Controller('usuario')
export class UserController {
  constructor(private userService: UserService) {
  }

  @AllowAnonymous()
  @Get('listar')
  listar(@Res() res) {
    return res.view('listar-usuarios.hbs');
  }
  
  @AllowAnonymous()
  @Get('cadastro')
  cadastro(@Res() res) {
    return res.view('cadastro-usuario.hbs');
  }
  @AllowAnonymous()
  @Get('cadastro/:id')
  async createEditHbs(@Res() res, @Param('id') id: string) {
    return res.view('editar-usuario.hbs', {id: id});
  }

  @HttpCode(201)
  @Post('cadastro')
  async createHbs(@Response() res, @Body() user: UserDto) {
    try {
      await this.userService.create(user);
      return res.send({ message: 'cadastro efeutado com suacesso!' });
    } catch (err) {
      return res.view('cadastro-usuario.hbs', {
        title: 'Castro de Usuário',
        message: err,
      });
    }
  }

  @HttpCode(204)
  @Put('cadastro/:id')
  async createEdit(@Res() res, @Body() user: UserDto, @Param('id') id: string) {
    try {
      if (id) {
        const userDb = await this.userService.findOne(id);
        if (userDb) {
          const userDto = await UserFactory.MapToUser(user, id);
          await this.userService.update(userDto);
          return res.view('cadastro-usuario.hbs', {
            title: 'Editar Usuário',
            message: 'Alteração efeutada com suacesso!',
            usuario: {},
          });
        }
      }
    } catch (err) {
      return res.view('cadastro-usuario.hbs', {
        title: 'Editar Usuário',
        message: err,
      });
    }
  }

  @HttpCode(201)
  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @HttpCode(200)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @HttpCode(204)
  @Put()
  async update(@Body() user: User) {
    try {
      await this.userService.update(user);
      return { message: 'Usuário cadastrado com sucesso!' };
    } catch (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(204)
  @Delete('cadastro/:id')
  async delete(@Param('id') id: string) {
    if (id && id !== "")
      return await this.userService.delete(id);
    else
      throw new HttpException({
        message: "Id não encontrado!",
      }, HttpStatus.BAD_REQUEST);
  }
}
