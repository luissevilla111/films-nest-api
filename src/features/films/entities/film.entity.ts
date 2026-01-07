import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Film extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  yearLaunch: number;

  @Prop({ required: false, type: String })
  director: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: [String] })
  keywords: string[];

  @Prop({ required: true, type: Number })
  duration: number;

  @Prop({ required: false, type: String })
  watchedDay: string;

  @Prop({ required: false, type: String })
  recommendatedBy: string;

  @Prop({ required: true, type: [String] })
  genres: string[];

  @Prop({ required: true, type: String })
  owner: string;

  @Prop({ required: true, type: Boolean })
  isWatched: boolean;

  @Prop({ required: false, type: String })
  @Prop({ required: true, type: String })
  addedBy: string;

  @Prop({ required: true, type: String })
  group: string;
}
export const FilmSchema = SchemaFactory.createForClass(Film);
