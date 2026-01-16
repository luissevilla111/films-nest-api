import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service],
  exports: [S3Service], // <- clave para poder usarlo en otros módulos
})
export class S3Module {}
