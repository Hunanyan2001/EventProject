import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './middelwares/forbiden.exception';
import { logger } from './middelwares/logger.middleware';
import { addSwagger } from './shared/swagger.config';

export async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(express()),
  );

  app.enableCors({
    origin: '*',
  });

  app.use(logger);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  addSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
