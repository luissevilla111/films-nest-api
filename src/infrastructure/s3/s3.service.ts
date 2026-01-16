import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get('AWS_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY') || '',
      },
    });

    this.bucket = this.config.get('AWS_S3_BUCKET') || 'bucketname';
  }

  async putObject(
    key: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: contentType,
        }),
      );

      return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error uploading file to S3');
    }
  }
}
