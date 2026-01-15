import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person, PersonSchema } from './entities/person.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
})
export class PeopleModule {}
