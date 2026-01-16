import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsUrl,
  IsInt,
  Min,
  MaxLength,
  Max,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { normalizeArrayFormValue } from 'src/features/helpers/string.transform';

const yearSpace = 2;
const MAX_YEAR_LAUNCH = new Date().getFullYear() + yearSpace;
const MAX_KEYWORDS = 5;
const MAX_GENRES = 3;
const MIN_GENRES = 2;

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Transform(({ value }) => value.trim().toUpperCase())
  name: string;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1888) // primera película de la historia 😉
  @Max(MAX_YEAR_LAUNCH)
  yearLaunch: number;

  @IsArray()
  @ArrayMaxSize(MAX_KEYWORDS)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(2)
  @Transform(({ value }) => normalizeArrayFormValue(value))
  keywords: string[];

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;

  @IsOptional()
  @IsString()
  watchedDay?: string;

  @IsOptional()
  @IsString()
  recommendatedBy?: string;

  @IsArray()
  @ArrayMinSize(MIN_GENRES)
  @ArrayMaxSize(MAX_GENRES)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => normalizeArrayFormValue(value))
  genres: string[];

  @IsString()
  @IsNotEmpty()
  // whose film is it? luis or selva
  owner: string;

  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  isWatched?: boolean;

  @IsString()
  @IsOptional()
  group?: string;
}
