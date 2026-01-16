import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AiPrompt } from './entity/ai-prompt.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PROMPT_TYPES } from 'src/shared/common/propmtTypes.const';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  constructor(
    @InjectModel(AiPrompt.name) private aiPromptModel: Model<AiPrompt>,
    private readonly configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }
  async generateFilmDescription(
    filmName: string,
    additionalContext?: Record<string, any>,
  ): Promise<string> {
    const promptType = PROMPT_TYPES.FILM_DESCRIPTION;
    const prompt = await this.getPrompt(promptType);
    if (!prompt) {
      throw new NotFoundException('Prompt not found');
    }
    // Por ahora retorna un placeholder
    return `Descripción generada por AI para: ${filmName}`;
  }

  private async getPrompt(promptType: string) {
    const promptCollection = await this.aiPromptModel.findOne({
      type: promptType,
    });
    if (!promptCollection) {
      throw new NotFoundException('Prompt not found');
    }
    return promptCollection.prompt;
  }

  private async executeBasicPrompt(systemPrompt: string, userPrompt: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });
    return response.choices[0].message.content;
  }
}
