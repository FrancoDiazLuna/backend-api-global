import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const appPort = +process.env.APP_PORT;
  const appPrefix = process.env.APP_PREFIX;

  app.setGlobalPrefix(appPrefix);

  configurePipes(app);
  configureSwagger(app, appPrefix);

  try {
    await app.listen(appPort);
    logger.log(`App Running at Port: ${appPort}`);
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`, error.stack);
    process.exit(1);
  }
}

const configurePipes = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
};

const configureSwagger = (app: INestApplication, appPrefix: string): void => {
  const env = process.env.ENVIRONMENT;
  const appVersion = process.env.APP_VERSION || '1.0.0';

  if (env === 'Development' || env === 'Preproduction') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Global Think Technology - API REST')
      .setDescription(`Environment ${env}`)
      .setVersion(`v${appVersion}`)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(appPrefix, app, document);
  }
};

bootstrap();
