import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangelogService {
  findAll() {
    return `This action returns all changelog`;
  }
}
