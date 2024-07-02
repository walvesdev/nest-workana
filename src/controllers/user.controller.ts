import { Get, Controller, HttpCode, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/users/user.service';
import { User } from '../models/user';
import { UserDto } from '../models/dtos/user.dto';
import { AllowAnonymous } from '../services/utils/constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @AllowAnonymous()
  @HttpCode(201)
  @Post()
  async create(@Body() user: UserDto) {
    return this.userService.create(user);
  }
  @AllowAnonymous()
  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @AllowAnonymous()
  @HttpCode(200)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @AllowAnonymous()
  @HttpCode(204)
  @Put()
  async update(@Body() user: UserDto) {
    return await this.userService.update(user);
  }

  @AllowAnonymous()
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
