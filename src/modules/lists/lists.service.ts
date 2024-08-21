import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './interfaces/list.interface';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListsService {
  constructor(@InjectModel('List') private readonly listModel: Model<List>) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const createdList = new this.listModel(createListDto);
    return await createdList.save();
  }

  async findAll(boardId: string): Promise<List[]> {
    return await this.listModel.find({ boardId }).exec();
  }

  async findOne(id: string): Promise<List> {
    const list = await this.listModel.findById(id).exec();
    if (!list) {
      throw new NotFoundException(`List #${id} not found`);
    }
    return list;
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List> {
    const updatedList = await this.listModel
      .findByIdAndUpdate(id, updateListDto, { new: true })
      .exec();
    if (!updatedList) {
      throw new NotFoundException(`List #${id} not found`);
    }
    return updatedList;
  }

  async remove(id: string): Promise<List> {
    const deletedList = await this.listModel.findByIdAndDelete(id).exec();
    if (!deletedList) {
      throw new NotFoundException(`List #${id} not found`);
    }
    return deletedList;
  }
}
