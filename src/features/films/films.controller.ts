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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadedFile as UploadedFileType } from './types/file.type';
import { GenerateDescriptionDto } from './dto/generate-description.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

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

  @Get()
  findAll() {
    return this.filmsService.findAll();
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
