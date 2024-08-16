import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from '../../models/user/user.model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const users: User[] = [
        {
          id: '1',
          nombre: 'John',
          correoElectronico: 'john@example.com',
          edad: 25,
        },
      ];

      // Llenamos la memoria con usuarios
      service.fillUsersWithSeedData(users);

      expect(service.findAll()).toEqual(users);
    });
  });

  describe('findOneById', () => {
    it('should return a user by ID', () => {
      const users: User[] = [
        {
          id: '1',
          nombre: 'John',
          correoElectronico: 'john@example.com',
          edad: 25,
        },
      ];

      service.fillUsersWithSeedData(users);

      expect(service.findOneById('1')).toEqual(users[0]);
    });

    it('should throw NotFoundException if user is not found', () => {
      expect(() => service.findOneById('invalid-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto = {
        nombre: 'John',
        correoElectronico: 'john@example.com',
        edad: 25,
      };

      const newUser = service.create(createUserDto);

      expect(newUser).toHaveProperty('id');
      expect(newUser.nombre).toBe(createUserDto.nombre);
      expect(newUser.correoElectronico).toBe(createUserDto.correoElectronico);
      expect(newUser.edad).toBe(createUserDto.edad);
    });
  });

  describe('update', () => {
    it('should update an existing user', () => {
      const users: User[] = [
        {
          id: '1',
          nombre: 'John',
          correoElectronico: 'john@example.com',
          edad: 25,
        },
      ];

      service.fillUsersWithSeedData(users);

      const updateUserDto = { nombre: 'John Updated', edad: 26 };

      const updatedUser = service.update('1', updateUserDto);

      expect(updatedUser.nombre).toBe(updateUserDto.nombre);
      expect(updatedUser.edad).toBe(updateUserDto.edad);
    });

    it('should throw NotFoundException if user is not found', () => {
      expect(() => service.update('invalid-id', { nombre: 'test' })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a user by ID', () => {
      const users: User[] = [
        {
          id: '1',
          nombre: 'John',
          correoElectronico: 'john@example.com',
          edad: 25,
        },
      ];

      service.fillUsersWithSeedData(users);

      service.delete('1');

      expect(service.findAll()).toHaveLength(0);
    });

    it('should throw NotFoundException if user is not found', () => {
      expect(() => service.delete('invalid-id')).toThrow(NotFoundException);
    });
  });
});
