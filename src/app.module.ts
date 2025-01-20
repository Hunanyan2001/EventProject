import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { logger } from './middelwares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ChatModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'user',
      password: 'userpassword',
      database: 'testdb',
      entities: entities,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'), // Path to your static assets directory
    }),
  ],
  controllers: [UsersController],
  providers: [],
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
