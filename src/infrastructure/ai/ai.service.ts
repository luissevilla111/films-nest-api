import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generateFilmDescription(
    filmName: string,
    additionalContext?: Record<string, any>,
  ): Promise<string> {
    // TODO: Implementar lógica para generar descripción usando modelos de AI
    // Por ahora retorna un placeholder
    return `Descripción generada por AI para: ${filmName}`;
  }
}
