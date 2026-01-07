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
} from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsInt()
  @Min(1888) // primera película de la historia 😉
  yearLaunch: number;

  @IsUrl()
  imageUrl: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
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
