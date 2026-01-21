import { Injectable, NotFoundException } from '@nestjs/common';
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
import { buildFilmQuery } from './helpers/build-film-query.helper';
import { buildFilmSort } from './helpers/build-film-sort.helper';
import { stringToDateDDMMYYYY } from 'src/shared/helpers/dates.helpers';
import { SearchDto } from './dto/search.dto';
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
      createFilmDto.angelScore,
      createFilmDto.selvaScore,
    );

    const addedBy = 'cognitoUserId';
    const isWatched = createFilmDto.watchedDay ? true : false;
    const watchedDayDate = createFilmDto.watchedDay
      ? stringToDateDDMMYYYY(createFilmDto.watchedDay)
      : undefined;
    console.log(watchedDayDate);
    const newFilm = {
      ...createFilmDto,
      imageUrl,
      averageScore,
      addedBy,
      isWatched,
      watchedDayDate,
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
    const { page, pageSize } = filters;
    const pageSizeValue = pageSize ?? 20;
    const pageValue = page ?? 1;
    const skip = (pageValue - 1) * pageSizeValue;

    const query = buildFilmQuery(filters);
    const sort = buildFilmSort(filters);

    const [films, totalItems] = await Promise.all([
      this.filmModel
        .find(query)
        .select(['-__v'])
        .skip(skip)
        .limit(pageSizeValue)
        .sort(sort)
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

  async autocomplete(searchDto: SearchDto) {
    const { search } = searchDto;

    if (!search) {
      return [];
    }

    const normalized = search;
    const regex = new RegExp(normalized, 'i'); // 'i' para case-insensitive

    return await this.filmModel.find({
      $or: [
        { name: regex },
        { keywords: regex },
        { alternativeNames: regex },
      ],
    }).limit(10).exec();
  }

  findOne(id: number) { }

  async findById(id: string) {
    const film = await this.filmModel.findById(id);
    if (!film) {
      throw new NotFoundException(`Película con id ${id} no encontrada`);
    }
    return film;
  }

  async update(
    id: string,
    updateFilmDto: UpdateFilmDto,
    file?: UploadedFile,
  ) {
    // Buscar la película existente
    const existingFilm = await this.findById(id);

    // Preparar los datos de actualización
    const updateData: any = { ...updateFilmDto };

    // Si viene un archivo, subirlo a S3 y actualizar la URL
    if (file) {
      const imageUrl = await this.s3.putObject(
        'films/covers',
        normalizeFilmName(file.originalname?.toLowerCase()),
        file.buffer,
        file.mimetype,
      );
      updateData.imageUrl = imageUrl;
    }
    // Si no viene archivo, mantener el imageUrl existente (no se incluye en updateData)

    // Calcular averageScore si vienen los scores
    if (updateFilmDto.angelScore !== undefined || updateFilmDto.selvaScore !== undefined) {
      const angelScore = updateFilmDto.angelScore ?? existingFilm.angelScore;
      const selvaScore = updateFilmDto.selvaScore ?? existingFilm.selvaScore;
      updateData.averageScore = calculateAverageDownToOneDecimal(
        angelScore,
        selvaScore,
      );
    }

    // Manejar watchedDay si viene
    if (updateFilmDto.watchedDay) {
      updateData.isWatched = updateFilmDto.watchedDay ? true : false;
      updateData.watchedDayDate = updateFilmDto.watchedDay
        ? stringToDateDDMMYYYY(updateFilmDto.watchedDay)
        : undefined;
    }

    // Actualizar la película
    const updatedFilm = await this.filmModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    return updatedFilm;
  }

  async remove(id: string) {
    const existingFilm = await this.findById(id);

    await existingFilm.deleteOne();
    return { message: 'Film deleted successfully' };
  }
}
