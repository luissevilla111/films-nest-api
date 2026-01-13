import { Module } from '@nestjs/common';
import { ChangelogModule } from './changelog/changelog.module';
import { DemoModule } from './demo/demo.module';
import { FilmsModule } from './films/films.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [DemoModule, ChangelogModule, FilmsModule, PeopleModule],
})
export class FeatureModule {}
