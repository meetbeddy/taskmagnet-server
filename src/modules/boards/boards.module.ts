import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { CollectionRegistry } from '../../common/database/collection.registry';

@Module({
  imports: [MongooseModule.forFeature(CollectionRegistry)],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
