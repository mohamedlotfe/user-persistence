import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export class S3Uploader {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
  }

  async uploadPhoto(file: Buffer, fileName: string): Promise<string> {
    const key = `${uuidv4()}-${fileName}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file,
      ACL: 'public-read',
    };

    await this.s3.putObject(params).promise();

    return `https://${params.Bucket}.s3.${this.s3.config.region}.amazonaws.com/${key}`;
  }

  async convertToBuffer(photo: string): Promise<Buffer> {
    const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }
}