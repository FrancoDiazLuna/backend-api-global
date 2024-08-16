import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '62ffcbf0-8d2f-455d-a895-bab8ad150eba',
    description: 'User ID',
    uniqueItems: true,
    readOnly: true,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @ApiProperty({
    example: 'Franco',
    description: 'User Name',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  readonly nombre?: string;

  @ApiProperty({
    example: 'diazlunafrancoe@gmail.com',
    description: 'User Email',
    uniqueItems: true,
    format: 'email',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly correoElectronico?: string;

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
  @IsOptional()
  readonly edad?: number;
}
