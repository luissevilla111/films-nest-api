import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AiPrompt, AiPromptSchema } from './entity/ai-prompt.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AiPrompt.name, schema: AiPromptSchema },
    ]),
  ],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
