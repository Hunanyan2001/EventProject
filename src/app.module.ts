import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { logger } from './middelwares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../ormconfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST },
        { path: 'users/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes(UsersController);
  }
}
