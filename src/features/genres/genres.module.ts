import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre, GenreSchema } from './entities/genre.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
})
export class GenresModule {}
