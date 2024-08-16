import {
  BadRequestException,
  Injectable,
  //InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { InjectModel } from '@nestjs/mongoose';

//import { isValidObjectId, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { CreateUserDto, UpdateUserDto } from '../../dtos/user';
import { User } from './../../models/user/user.model';
//import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Para almacenar los registros de usuarios en memoria
  private users: User[] = [
    // {
    //   id: uuid(),
    //   nombre: 'Franco',
    //   correoElectronico: 'diazlunafrancoe@gmail.com',
    //   edad: 28,
    // },
  ];

  findAll() {
    return this.users;
  }

  findOneById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(`User whit id '${id}' not found.`);

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const emailExists = this.users.some(
      (user) => user.correoElectronico === createUserDto.correoElectronico,
    );

    if (emailExists) {
      throw new BadRequestException(
        `Email '${createUserDto.correoElectronico}' is already in use.`,
      );
    }

    const newUser: User = {
      id: uuid(),
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userDB = this.findOneById(id);

    if (updateUserDto.id && updateUserDto.id !== id)
      throw new BadRequestException(`User id is not valid.`);

    // Verifica si el correo electrónico ya está en uso por otro usuario
    const emailExists = this.users.some(
      (user) =>
        user.correoElectronico === updateUserDto.correoElectronico &&
        user.id !== id,
    );

    if (emailExists) {
      throw new BadRequestException(
        `Email '${updateUserDto.correoElectronico}' is already in use.`,
      );
    }

    Object.assign(userDB, updateUserDto);

    return userDB;
  }

  delete(id: string) {
    this.findOneById(id);

    this.users = this.users.filter((user) => user.id !== id);
  }

  fillUsersWithSeedData(users: User[]) {
    const emails = new Set();

    users.forEach((user) => {
      if (emails.has(user.correoElectronico)) {
        throw new BadRequestException(
          `Duplicate email found in seed data: '${user.correoElectronico}'.`,
        );
      }
      emails.add(user.correoElectronico);
    });

    this.users = users;
  }
}

// Con Mongo
// comentar la definicion anterior de la clase y descomentar la siguiente
// revisar imports comentados
// export class UsersService {
//   constructor(
//     @InjectModel(User.name)
//     private readonly userModel: Model<User>,
//   ) {}

//   findAllDB() {
//     return this.userModel.find();
//   }

//   async findOneByIdDB(id: string) {
//     let user: User;

//     if (isValidObjectId(id)) {
//       user = await this.userModel.findById(id);
//     }

//     if (!user) throw new NotFoundException(`User whit id '${id}' not found.`);

//     return user;
//   }

//   async createDB(createUserDto: CreateUserDto) {
//     try {
//       const newUser = await this.userModel.create(createUserDto);
//       return newUser;
//     } catch (error) {
//       this.handleExceptions(error);
//     }
//   }

//   async updateDB(id: string, updateUserDto: UpdateUserDto) {
//     const user = await this.findOneByIdDB(id);

//     await user.updateOne(updateUserDto);

//     return { ...user.toJSON(), ...updateUserDto };
//   }

//   async deleteDB(id: string) {
//     const user = await this.findOneByIdDB(id);

//     await user.deleteOne();
//   }

//   private handleExceptions(error: any) {
//     if (error.code === 11000) {
//       throw new BadRequestException(
//         `User exist in DB ${JSON.stringify(error.keyValue)}`,
//       );
//     }
//     console.log(error);
//     throw new InternalServerErrorException(
//       `Can't create User - Check server logs`,
//     );
//   }
// }
