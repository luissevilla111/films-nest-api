import { Module } from '@nestjs/common';
import { ChangelogModule } from './changelog/changelog.module';
import { DemoModule } from './demo/demo.module';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [DemoModule, ChangelogModule, FilmsModule],
})
export class FeatureModule {}
