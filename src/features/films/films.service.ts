import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from './entities/film.entity';
import { Model } from 'mongoose';
import { UploadedFile } from './types/file.type';
import { S3Service } from 'src/infrastructure/s3/s3.service';
import { AiService } from 'src/infrastructure/ai/ai.service';
import { normalizeFilmName } from 'src/shared/helpers/text.helpers';
import { calculateAverageDownToOneDecimal } from 'src/shared/helpers/math.helper';
import { FilmFiltersDto } from './dto/filter.dto';
@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<Film>,
    private readonly s3: S3Service,
    private readonly aiService: AiService,
  ) { }

  async create(createFilmDto: CreateFilmDto, file: UploadedFile) {
    //console.log(createFilmDto);

    const imageUrl = await this.s3.putObject(
      'films/covers',
      normalizeFilmName(file.originalname?.toLowerCase()),
      file.buffer,
      file.mimetype,
    );

    const averageScore = calculateAverageDownToOneDecimal(
      createFilmDto.meScore,
      createFilmDto.partnerScore,
    );

    const addedBy = 'cognitoUserId';
    const isWatched = createFilmDto.watchedDay ? true : false;

    const newFilm = {
      ...createFilmDto,
      imageUrl,
      averageScore,
      addedBy,
      isWatched,
    };
    const createdFilm = await this.filmModel.create(newFilm);

    return createdFilm;
    // Aquí puedes procesar el archivo si es necesario
    // Por ejemplo, guardarlo en el sistema de archivos o subirlo a un servicio de almacenamiento
    // Por ahora, solo lo incluimos en el objeto si existe

    /* await this.s3.putObject(file.originalname, file.buffer, file.mimetype);
    const newFilm = {
      ...createFilmDto,
      addedBy: 'luis', // o obtenerlo del contexto de autenticación
      // Si hay un archivo, podrías guardar la ruta o URL aquí
      // imageUrl: file ? await this.saveFile(file) : createFilmDto.imageUrl,
    };
    return this.filmModel.create(newFilm); */
  }
  generateDescription(movieName: string) {
    return this.aiService.generateFilmDescription(movieName);
  }

  async findAll(filters: FilmFiltersDto) {
    const { page, pageSize, isWatched, recommendatedBy, owner, genres } = filters;
    const pageSizeValue = pageSize ?? 20;
    const pageValue = page ?? 1;
    const skip = (pageValue - 1) * pageSizeValue;

    console.log(filters);

    console.log({ pageSizeValue });
    console.log({ pageValue });
    console.log({ skip });

    const query: any = {};

    if (isWatched !== undefined) {
      query.isWatched = isWatched;

    }

    if (recommendatedBy !== undefined) {
      query.recommendatedBy = recommendatedBy;
    }

    if (owner !== undefined) {
      query.owner = owner;

    }

    if (genres?.length) {
      query.genres = { $in: genres };
    }


    console.log(query);

    const [films, totalItems] = await Promise.all([
      this.filmModel
        .find(query)
        .select('-__v')
        .skip(skip)
        .limit(pageSizeValue)
        .exec(),

      this.filmModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / pageSizeValue);
    return {
      films,
      page: pageValue,
      pageSize: pageSizeValue,
      totalItems,
      totalPages,
      nextPage: pageValue < totalPages ? pageValue + 1 : null,
    };
  }

  findOne(id: number) { }

  update(id: number, updateFilmDto: UpdateFilmDto) { }

  remove(id: number) { }
}
