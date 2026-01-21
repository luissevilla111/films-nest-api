import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadedFile as UploadedFileType } from './types/file.type';
import { GenerateDescriptionDto } from './dto/generate-description.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FilmFiltersDto } from './dto/filter.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post('generate-description')
  generateDescription(@Body() dto: GenerateDescriptionDto) {
    return this.filmsService.generateDescription(dto.name);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createFilmDto: CreateFilmDto,
    @UploadedFile(new FileValidationPipe())
    file: UploadedFileType,
  ) {
    return this.filmsService.create(createFilmDto, file);
  }

  @Get('autocomplete')
  async autocomplete(@Query('search') search: string) {
    return await this.filmsService.autocomplete(search);
  }

  @Get()
  async findAll(@Query() filters: FilmFiltersDto) {
    return await this.filmsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
