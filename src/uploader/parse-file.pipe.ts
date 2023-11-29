import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { IFile } from './File.interface';

@Injectable()
export class ParseFile implements PipeTransform {
  minCount = 0;
  constructor(minCount: number) {
    this.minCount = minCount;
  }

  transform(
    files: IFile | IFile[],
    metadata: ArgumentMetadata,
  ): IFile | IFile[] {
    if (files === undefined || files === null) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (Array.isArray(files) && files.length === 0) {
      throw new BadRequestException('Validation failed (files expected)');
    }
    if (
      this.minCount > 0 &&
      Array.isArray(files) &&
      files.length < this.minCount
    ) {
      throw new BadRequestException(
        `At least ${this.minCount} files should be uploaded`,
      );
    }

    return files;
  }
}
