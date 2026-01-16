import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AiPrompt extends Document {
  @Prop({ required: true, unique: true, index: true })
  prompt: string;
  @Prop({ required: true, type: String })
  type: string;
}
export const AiPromptSchema = SchemaFactory.createForClass(AiPrompt);