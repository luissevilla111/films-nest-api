import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Genre extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
