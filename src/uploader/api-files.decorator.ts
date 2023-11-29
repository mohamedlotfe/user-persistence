import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { fileMimetypeFilter } from './file-mimetype-filter';

export function ApiFile(
  fieldName: string = 'file',
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
  );
}

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
) {
  return ApiFile(fileName, {
    fileFilter: fileMimetypeFilter('image'),
  });
}

export function ApiPdfFile(
  fileName: string = 'image',
  required: boolean = false,
) {
  return ApiFile(fileName, {
    fileFilter: fileMimetypeFilter('pdf'),
  });
}

export function ApiFiles(
  fieldName: string = 'files',
  maxCount: number = 10,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)),
  );
}
