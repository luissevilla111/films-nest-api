import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from './entities/film.entity';
import { Model } from 'mongoose';
import { UploadedFile } from './types/file.type';
import { S3Service } from 'src/infrastructure/s3/s3.service';
@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<Film>,
    private readonly s3: S3Service,
  ) {}

  async create(createFilmDto: CreateFilmDto, file: UploadedFile) {
    // Aquí puedes procesar el archivo si es necesario
    // Por ejemplo, guardarlo en el sistema de archivos o subirlo a un servicio de almacenamiento
    // Por ahora, solo lo incluimos en el objeto si existe

    await this.s3.putObject(file.originalname, file.buffer, file.mimetype);
    const newFilm = {
      ...createFilmDto,
      addedBy: 'luis', // o obtenerlo del contexto de autenticación
      // Si hay un archivo, podrías guardar la ruta o URL aquí
      // imageUrl: file ? await this.saveFile(file) : createFilmDto.imageUrl,
    };
    return this.filmModel.create(newFilm);
  }

  findAll() {
    return this.filmModel.find().select('-__v');
  }

  findOne(id: number) {}

  update(id: number, updateFilmDto: UpdateFilmDto) {}

  remove(id: number) {}
}
