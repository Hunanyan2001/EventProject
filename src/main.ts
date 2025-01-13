import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middelwares/logger.middleware';
import { GlobalExceptionFilter } from './middelwares/forbiden.exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
