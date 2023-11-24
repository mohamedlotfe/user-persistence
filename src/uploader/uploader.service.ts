import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { IFile } from './File.interface';

@Injectable()
export class UploaderService {
  AWS_S3_BUCKET = process.env.S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  });

  async upload(file: IFile): Promise<string> {
    console.log(file);

    return this.uploadByS3(file, this.AWS_S3_BUCKET);
  }

  async uploadByS3(file: IFile, bucket: string): Promise<string> {
    const { originalname, mimetype } = file;
    const key = `${uuidv4()}-${originalname.trim()}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      let response = await this.s3.upload(params).promise();
      console.log('s3Response ', response);
      return (
        response.Location ??
        `https://${params.Bucket}.s3.${this.s3.config.region}.amazonaws.com/${key}`
      );
    } catch (e) {
      console.log(e);
    }
  }
}
