import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Database populated successfully',
    content: {
      'application/json': {
        example: { message: 'Database seeded successfully' }, // Ejemplo de respuesta
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  runSeed() {
    return this.seedService.pupulateDB();
  }
}
