import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.login(email, password);
  }

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.registration(
      firstName,
      lastName,
      email,
      password,
    );
  }
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
