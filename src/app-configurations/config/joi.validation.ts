import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  ENVIRONMENT: Joi.string().default('dev'),

  APP_PORT: Joi.number().default(3000),
  APP_PREFIX: Joi.string().default('api'),
  APP_VERSION: Joi.string().default('0.0.1'),

  CORS_METHODS: Joi.string().default('GET,HEAD,PUT,PATCH,POST,DELETE'),
  CORS_ORIGINS: Joi.string().uri().optional(),

  MONGODB: Joi.string().uri().required(),
});
