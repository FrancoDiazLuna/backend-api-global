export const EnvConfiguration = () => ({
  environment: process.env.ENVIRONMENT || 'dev',
  appPort: process.env.APP_PORT || '3000',
  appPrefix: process.env.APP_PREFIX || 'api',
  appVersion: process.env.APP_VERSION || '0.0.1',
  corsMethods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  mongodb: process.env.MONGODB,
});
