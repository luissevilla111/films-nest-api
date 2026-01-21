import { Transform } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { normalizeText } from 'src/shared/helpers/text.helpers';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Nombre del género',
    example: 'acción',
    maxLength: 30,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Transform(({ value }) => normalizeText(value as string))
  name: string;
}
