import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/taskmagnet'),
    TasksModule,
    BoardsModule,
    AuthModule,
    ListsModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
