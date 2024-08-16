import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../user/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule],
})
export class SeedModule {}
