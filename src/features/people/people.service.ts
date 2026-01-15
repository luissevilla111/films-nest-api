import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PeopleService {
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}
  async create(createPersonDto: CreatePersonDto) {
    const existingPerson = await this.findPersonByName(createPersonDto.name);
    if (existingPerson) {
      throw new BadRequestException('Person already exists');
    }
    const newPerson = { ...createPersonDto };
    return await this.personModel.create(newPerson);
  }

  async findAll() {
    return await this.personModel.find().sort({ name: 1 }).select('-__v');
  }

  async findOne(id: string) {
    return await this.personModel.findById(id);
  }

  private async findPersonByName(name: string) {
    return this.personModel.findOne({ name });
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    if (Object.keys(updatePersonDto).length === 0) {
      throw new BadRequestException('No data to update');
    }
    const existingPerson = await this.validatePersonExists(id);
    existingPerson.name = updatePersonDto.name;

    return await existingPerson.save();
  }

  async remove(id: string) {
    await this.validatePersonExists(id);
    await this.personModel.findByIdAndDelete(id);
    return { message: 'Person deleted successfully' };
  }

  private async validatePersonExists(id: string) {
    const existingPerson = await this.personModel.findById(id);
    if (!existingPerson) {
      throw new NotFoundException('Person not found');
    }
    return existingPerson;
  }
}
