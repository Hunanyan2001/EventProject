import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path/posix';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './middelwares/forbiden.exception';
import { logger } from './middelwares/logger.middleware';
import { addSwagger } from './shared/swagger.config';

export async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(express())
  ); // Using ExpressAdapter correctly


  // Set up static assets and views
  app.useStaticAssets(join(__dirname, '..', 'static')); // For serving static files
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Set views directory
  app.setViewEngine('ejs'); // Set EJS as the template engine


  // Middleware and global settings
  app.use(logger);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  addSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
