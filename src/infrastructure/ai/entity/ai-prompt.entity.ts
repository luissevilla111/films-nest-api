import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ai-prompts' })
export class AiPrompt extends Document {
  @Prop({ required: true, unique: true, index: true })
  prompt: string;
  @Prop({ required: true, type: String })
  type: string;
  @Prop({ required: true, type: String })
  userPrompt: string;
  @Prop({ required: true, type: String })
  systemPrompt: string;
}
export const AiPromptSchema = SchemaFactory.createForClass(AiPrompt);
