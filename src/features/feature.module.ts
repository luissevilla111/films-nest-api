import { Module } from '@nestjs/common';
import { ChangelogModule } from './changelog/changelog.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [DemoModule, ChangelogModule],
})
export class FeatureModule {}
