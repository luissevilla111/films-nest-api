import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}
  async create(createGenreDto: CreateGenreDto) {
    const existingGenre = await this.findGenreByName(createGenreDto.name);
    if (existingGenre) {
      throw new BadRequestException('Genre already exists');
    }
    const newGenre = { ...createGenreDto };
    return await this.genreModel.create(newGenre);
  }

  async findAll() {
    return await this.genreModel.find().sort({ name: 1 }).select('-__v');
  }

  async findOne(id: string) {
    return await this.genreModel.findById(id);
  }

  private async findGenreByName(name: string) {
    return this.genreModel.findOne({ name });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    if (Object.keys(updateGenreDto).length === 0) {
      throw new BadRequestException('No data to update');
    }
    const existingGenre = await this.validateGenreExists(id);
    existingGenre.name = updateGenreDto.name;

    return await existingGenre.save();
  }

  async remove(id: string) {
    await this.validateGenreExists(id);
    await this.genreModel.findByIdAndDelete(id);
    return { message: 'Genre deleted successfully' };
  }

  private async validateGenreExists(id: string) {
    const existingGenre = await this.genreModel.findById(id);
    if (!existingGenre) {
      throw new NotFoundException('Genre not found');
    }
    return existingGenre;
  }
}
