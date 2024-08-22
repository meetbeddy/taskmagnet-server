import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './modules/tasks/tasks.module';
import { BoardsModule } from './modules/boards/boards.module';
import { AuthModule } from './modules/auth/auth.module';
import { ListsModule } from './modules/lists/lists.module';
import { CardsModule } from './modules/cards/cards.module';
import { CollectionRegistry } from './common/database/collection.registry';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/taskmagnet'),
    MongooseModule.forFeature(CollectionRegistry),
    TasksModule,
    BoardsModule,
    AuthModule,
    ListsModule,
    CardsModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
