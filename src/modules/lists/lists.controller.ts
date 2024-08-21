import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';

import { List } from './interfaces/list.interface';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listsService.create(createListDto);
  }

  @Get(':boardId')
  async findAll(@Param('boardId') boardId: string): Promise<List[]> {
    return this.listsService.findAll(boardId);
  }

  @Get('list/:id')
  async findOne(@Param('id') id: string): Promise<List> {
    return this.listsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ): Promise<List> {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<List> {
    return this.listsService.remove(id);
  }
}
