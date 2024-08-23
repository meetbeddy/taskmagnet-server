import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { CollectionRegistry } from '../../common/database/collection.registry';
import { CustomLogger } from 'src/common/logger/logger.service';

@Module({
  imports: [MongooseModule.forFeature(CollectionRegistry)],
  controllers: [BoardsController],
  providers: [BoardsService, CustomLogger],
})
export class BoardsModule {}
