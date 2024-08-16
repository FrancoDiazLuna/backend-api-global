import { Injectable } from '@nestjs/common';

import { USERS_SEED } from './data/users.seed';
import { UsersService } from '../user/users.service';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  pupulateDB() {
    //USERS_SEED;
    this.usersService.fillUsersWithSeedData(USERS_SEED);

    return 'SEED executed successfully';
  }
}
