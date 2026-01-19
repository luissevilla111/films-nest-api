import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  MaxLength,
  Max,
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { normalizeArrayFormValue, normalizeKeyWords } from 'src/features/helpers/string.transform';
import { IsDateFormat } from 'src/shared/decorators/is-date-format.decorator';
import { normalizeCase } from 'src/shared/helpers/text.helpers';

const yearSpace = 2;
const MAX_YEAR_LAUNCH = new Date().getFullYear() + yearSpace;
const MIN_KEYWORDS = 2;
const MAX_KEYWORDS = 5;
const MAX_GENRES = 3;
const MIN_GENRES = 2;
const MIN_ACTORS = 1;
const MAX_ACTORS = 5;

const MIN_SCORE = 0;
const MAX_SCORE = 5;

const MIN_ALTERNATIVE_NAMES = 1;
const MAX_ALTERNATIVE_NAMES = 3;

export enum FilmOwner {
  Me = 'Me',
  Partner = 'Partner',
}

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Transform(({ value }) => normalizeCase(value))
  name: string;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1888) // primera película de la historia 😉
  @Max(MAX_YEAR_LAUNCH)
  yearLaunch: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @IsArray()
  @ArrayMinSize(MIN_GENRES)
  @ArrayMaxSize(MAX_GENRES)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => normalizeArrayFormValue(value))
  genres: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(MIN_ACTORS)
  @ArrayMaxSize(MAX_ACTORS)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => normalizeArrayFormValue(value))
  actors?: string[];

  @IsString()
  @IsOptional()
  group?: string;

  @IsOptional()
  @IsString()
  @IsDateFormat('DD/MM/YYYY')
  watchedDay?: string;

  @IsOptional()
  @IsString()
  recommendatedBy?: string;

  @IsNumber()
  @Min(MIN_SCORE)
  @Max(MAX_SCORE)
  @Transform(({ value }) => +value)
  meScore: number;

  @IsNumber()
  @Min(MIN_SCORE)
  @Max(MAX_SCORE)
  @Transform(({ value }) => +value)
  partnerScore: number;

  @IsArray()
  @ArrayMaxSize(MAX_KEYWORDS)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(MIN_KEYWORDS)
  @Transform(({ value }) => normalizeKeyWords(value))
  keywords: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_ALTERNATIVE_NAMES)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(MIN_ALTERNATIVE_NAMES)
  @Transform(({ value }) => normalizeArrayFormValue(value))
  alternativeNames: string[];

  @IsEnum(FilmOwner)
  @IsNotEmpty()
  // whose film is it? luis or selva
  owner: FilmOwner;

  /* @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  isWatched?: boolean; */
}
