import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SchemaJsonInterceptor } from '../collection.interceptor';

@Schema({ timestamps: true, versionKey: false })
export class Card extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'List', required: true })
  list: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: Types.ObjectId;

  @Prop({ default: 0 })
  position: number;

  @Prop({ default: false })
  archived: boolean;

  @Prop()
  dueDate: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card).set(
  'toJSON',
  SchemaJsonInterceptor,
);
