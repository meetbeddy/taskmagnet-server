import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AppException } from '../../common/exceptions/app.exception';
import { Board } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = new this.boardModel(createBoardDto);
    return await createdBoard.save();
  }

  async findAll(): Promise<Board[]> {
    return await this.boardModel.find().exec();
  }

  async findOne(id: string): Promise<Board> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new AppException(`Invalid ID format: ${id}`);
      }
      const board = await this.boardModel.findById(id).exec();
      console.log('board', board);
      if (!board) {
        throw new AppException(`Board #${id} not found`);
      }
      return board;
    } catch (error) {
      console.log(error);
      throw new AppException(error.message);
    }
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const updatedBoard = await this.boardModel
      .findByIdAndUpdate(id, updateBoardDto, { new: true })
      .exec();
    if (!updatedBoard) {
      throw new AppException(`Board #${id} not found`);
    }
    return updatedBoard;
  }

  //   async remove(id: string): Promise<Board> {
  //     const deletedBoard = await this.boardModel.findByIdAndRemove(id).exec();
  //     if (!deletedBoard) {
  //       throw new NotFoundException(`Board #${id} not found`);
  //     }
  //     return deletedBoard;
  //   }
}
