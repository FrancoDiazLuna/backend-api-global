import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Franco',
    description: 'User Name',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly nombre: string;

  @ApiProperty({
    example: 'diazlunafrancoe@gmail.com',
    description: 'User Email',
    uniqueItems: true,
    format: 'email',
  })
  @IsString()
  @IsEmail()
  readonly correoElectronico: string;

  @ApiProperty({
    example: 28,
    description: 'User Age',
    minimum: 1,
    maximum: 120,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(120)
  readonly edad: number;
}
