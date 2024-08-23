import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseFilters,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './interfaces/board.interface';
import { successResponse } from '../../common/responses/common.response';
import { BaseAppExceptionsFilter } from '../../common/exceptions/base.exception';
import { AppException } from 'src/common/exceptions/app.exception';

@Controller('boards')
@UseFilters(BaseAppExceptionsFilter)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    const response = this.boardsService.findAll();
    return successResponse(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.boardsService.findOne(id);
      return successResponse(response);
    } catch (error) {
      throw new AppException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const response = this.boardsService.update(id, updateBoardDto);
    return successResponse(response);
  }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string): Promise<Board> {
  //     return this.boardsService.remove(id);
  //   }
}
