// dto/generate-description.dto.ts
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class GenerateDescriptionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;
}
