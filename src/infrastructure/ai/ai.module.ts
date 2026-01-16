import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  providers: [AiService],
  exports: [AiService], // <- clave para poder usarlo en otros módulos
})
export class AiModule {}
