import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  ): Promise<{ description: string }> {
    const promptType = PROMPT_TYPES.FILM_DESCRIPTION;
    const promptObject = await this.getPrompt(promptType);
    const userPrompt = promptObject.userPrompt.replace(
      '{{filmName}}',
      filmName,
    );
    //console.log(promptObject);
    //return userPrompt;
    const response = await this.executeBasicPrompt(
      promptObject.systemPrompt,
      userPrompt,
    );

    if (!response) {
      throw new InternalServerErrorException('Error generating description');
    }

    return { description: response };
  }

  private async getPrompt(promptType: string) {
    const promptCollection = await this.aiPromptModel.findOne({
      type: promptType,
    });
    if (!promptCollection) {
      throw new NotFoundException('Prompt not found');
    }
    return {
      systemPrompt: promptCollection.systemPrompt,
      userPrompt: promptCollection.userPrompt,
    };
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
