import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from './entities/film.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from 'src/infrastructure/s3/s3.module';
import { AiModule } from 'src/infrastructure/ai/ai.module';
@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    S3Module,
    AiModule,
  ],
})
export class FilmsModule {}
