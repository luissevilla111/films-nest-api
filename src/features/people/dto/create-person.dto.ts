import { Transform } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { normalizeCase } from 'src/shared/helpers/text.helpers';

export class CreatePersonDto {
  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'John Doe',
    maxLength: 30,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Transform(({ value }) => normalizeCase(value as string))
  name: string;
}
