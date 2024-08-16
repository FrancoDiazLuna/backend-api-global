import { Module } from '@nestjs/common';
//import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import {
  EnvConfiguration,
  JoiValidationSchema,
} from './app-configurations/config';
import { UsersModule } from './features/user/users.module';
import { SeedModule } from './features/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    UsersModule,
    SeedModule,
    //MongooseModule.forRoot(process.env.MONGODB),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
