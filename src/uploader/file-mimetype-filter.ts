import { UnsupportedMediaTypeException } from '@nestjs/common';
import {IFile} from "./File.interface"


export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: IFile,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}

