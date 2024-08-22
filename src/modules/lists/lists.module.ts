import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListSchema } from '../../common/database/collections/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
