import { Document } from 'mongoose';

export interface Board extends Document {
  id?: string;
  name: string;
  description?: string;
  owner: string;
  members: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
