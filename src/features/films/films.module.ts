import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from './entities/film.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
})
export class FilmsModule {}
