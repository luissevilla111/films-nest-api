import {
  IsOptional,
  IsBoolean,
  IsString,
  IsArray,
  IsNotEmpty,
  IsIn,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class FilmFiltersDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => value === '1' || value === 'true')
  @IsBoolean()
  isWatched?: boolean;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  recommendatedBy?: boolean;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  owner?: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => value.map((genre: string) => genre.toLowerCase()))
  genres?: string[];

  @IsOptional()
  @IsIn(['name', 'averageScore', 'meScore', 'partnerScore'])
  sort?: 'name' | 'averageScore' | 'meScore' | 'partnerScore';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
