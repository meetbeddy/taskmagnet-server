import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SchemaJsonInterceptor } from '../collection.interceptor';

@Schema({ timestamps: true, versionKey: false })
export class Board extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board).set(
  'toJSON',
  SchemaJsonInterceptor,
);
