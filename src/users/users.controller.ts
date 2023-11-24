import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() payload: CreateUserDto): Promise<User> {
    try {
      if (await this.userService.isEmailExists(payload.email)) {
        throw new HttpException(
          'ERR_USER_EMAIL_EXISTS',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return await this.userService.createUser(payload);
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('get-user-by-id')
  async getUserById(@Query('id') id: number): Promise<User> {
    try {
      if (!id) {
        throw new HttpException('ERR_ID_IS_REQUIRED', HttpStatus.BAD_REQUEST);
      }
      const user: User | null = await this.userService.findOneByIdWithCach(id);
      if (user) {
        return user;
      } else {
        throw new HttpException('ERR_USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
