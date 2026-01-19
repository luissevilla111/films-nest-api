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

  @Prop({ required: true, type: [String] })
  keywords: string[];

  @Prop({ required: true, type: [String] })
  alternativeNames: string[];

  @Prop({ required: true, type: [String] })
  actors: string[];

  @Prop({ required: false, type: Number })
  duration?: number;

  @Prop({ required: false, type: String, default: '' })
  watchedDay?: string;

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
  meScore: number;

  @Prop({ required: true, type: Number, default: 0 })
  partnerScore: number;
}
export const FilmSchema = SchemaFactory.createForClass(Film);
