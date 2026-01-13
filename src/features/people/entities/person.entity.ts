import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Person extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
