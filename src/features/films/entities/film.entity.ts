import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Film extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, type: String, default: 'ai' })
  description: string;

  @Prop({ required: true, type: Number })
  yearLaunch: number;

  @Prop({ required: true, type: String, default: 'ai' })
  director: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: [String], index: true })
  keywords: string[];

  @Prop({ required: true, type: [String], index: true })
  alternativeNames: string[];

  @Prop({ required: true, type: [String] })
  actors: string[];

  @Prop({ required: false, type: Number })
  duration?: number;

  @Prop({ required: false, type: String, default: '' })
  watchedDay?: string;

  @Prop({ required: false, type: Date })
  watchedDayDate?: Date;

  @Prop({ required: false, type: String })
  recommendatedBy?: string;

  @Prop({ required: true, type: [String] })
  genres: string[];

  @Prop({ required: true, type: String })
  owner: string;

  @Prop({ required: true, type: Boolean, default: false })
  isWatched: boolean;

  @Prop({ required: true, type: String })
  addedBy: string;

  @Prop({ required: true, type: String, default: 'cinema' })
  group: string;

  @Prop({ required: true, type: Number, default: 0 })
  averageScore: number;

  @Prop({ required: true, type: Number, default: 0 })
  angelScore: number;

  @Prop({ required: true, type: Number, default: 0 })
  selvaScore: number;
}
export const FilmSchema = SchemaFactory.createForClass(Film);

FilmSchema.index(
  { keywords: 1, alternativeNames: 1 },
  { default_language: 'spanish' },
);
