import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
// import { Board } from '../../boards/schemas/board.schema';
import { BoardSchema } from '../../boards/schemas/board.schema';

@Schema()
export class List extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardId: typeof BoardSchema;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
