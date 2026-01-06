import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureModule } from './features/feature.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FeatureModule,
    MongooseModule.forRoot('mongodb://localhost:27017/films-db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
