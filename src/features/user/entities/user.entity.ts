import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '62ffcbf0-8d2f-455d-a895-bab8ad150eba',
    description: 'User ID',
    uniqueItems: true,
    readOnly: true,
  })
  id: string;

  @ApiProperty({
    example: 'Franco',
    description: 'User Name',
    minLength: 3,
    maxLength: 50,
  })
  nombre: string;

  @ApiProperty({
    example: 'diazlunafrancoe@gmail.com',
    description: 'User Email',
    uniqueItems: true,
    format: 'email',
  })
  correoElectronico: string;

  @ApiProperty({
    example: 28,
    description: 'User Age',
    uniqueItems: false,
    minimum: 1,
    maximum: 120,
  })
  edad: number;
}

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class User extends Document {
//   //id: string; //Mongo lo provee

//   @Prop({
//     index: true,
//   })
//   nombre: string;

//   @Prop({
//     unique: true,
//     index: true,
//   })
//   correoElectronico: string;

//   @Prop()
//   edad: number;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
