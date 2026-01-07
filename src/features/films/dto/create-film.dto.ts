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
} from 'class-validator';

const yearSpace = 2;
const MAX_YEAR_LAUNCH = new Date().getFullYear() + yearSpace;
const MAX_KEYWORDS = 5;

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Transform(({ value }) => value.trim().toUpperCase())
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsInt()
  @Min(1888) // primera película de la historia 😉
  @Max(MAX_YEAR_LAUNCH)
  yearLaunch: number;

  @IsUrl()
  imageUrl: string;

  @IsArray()
  @ArrayMaxSize(MAX_KEYWORDS)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) =>
    value.map((keyword: string) => keyword.trim().toUpperCase()),
  )
  keywords: string[];

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
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) =>
    value.map((genre: string) => genre.trim().toUpperCase()),
  )
  genres: string[];

  @IsString()
  @IsNotEmpty()
  // whose film is it? luis or selva
  owner: string;

  @IsBoolean()
  @IsOptional()
  isWatched?: boolean;

  @IsString()
  @IsOptional()
  group?: string;
}
