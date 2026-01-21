import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { UploadedFile } from '../types/file.type';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB en bytes
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

@Injectable()
export class OptionalFileValidationPipe implements PipeTransform {
    transform(value: UploadedFile | undefined, metadata: ArgumentMetadata) {
        // El archivo es opcional, si no viene retornamos undefined
        if (!value) {
            return undefined;
        }

        // Validar tipo de archivo solo si viene
        if (!ALLOWED_MIME_TYPES.includes(value.mimetype)) {
            throw new BadRequestException(
                `Tipo de archivo no permitido. Solo se aceptan: ${ALLOWED_MIME_TYPES.join(', ')}`,
            );
        }

        // Validar tamaño del archivo solo si viene
        if (value.size > MAX_FILE_SIZE) {
            throw new BadRequestException(
                `El archivo excede el tamaño máximo permitido de 5 MB. Tamaño actual: ${(value.size / 1024 / 1024).toFixed(2)} MB`,
            );
        }

        return value;
    }
}
