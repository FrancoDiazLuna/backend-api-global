import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users', type: [User] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get user by ID', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format',
  })
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User was created.', type: User })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User was updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format or bad request' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'User was deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}

// Con Mongo
// comentar la definicion anterior de la clase y descomentar la siguiente
// revisar imports comentados
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   getAllUsers() {
//     return this.usersService.findAllDB();
//   }

//   @Get(':id')
//   getUserById(@Param('id') id: string) {
//     return this.usersService.findOneByIdDB(id);
//   }

//   @Post()
//   createUser(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.createDB(createUserDto);
//   }

//   @Patch(':id')
//   updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.usersService.updateDB(id, updateUserDto);
//   }

//   @Delete(':id')
//   deleteUser(@Param('id') id: string) {
//     return this.usersService.deleteDB(id);
//   }
// }
