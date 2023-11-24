import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
interface ErrorMessage {
  status: number;
  message: string;
  type: string;
  errors: { code: number; message: string }[];
  errorCode: number;
  timestamp: string;
}
@Catch(QueryFailedError, EntityNotFoundError)
export class TypeORMQueryExceptionFilter extends TypeORMError {
  catch(
    exception: QueryFailedError | EntityNotFoundError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
        let message: string = (exception as TypeORMError).message;
        let code: number = (exception as any).code;
        const customResponse: ErrorMessage = {
            status: 500,
            message: 'Something Went Wrong',
            type: 'Internal Server Error',
            errors: [{ code: code, message: message }],
            errorCode: 300,
            timestamp: new Date().toISOString(),
        };

        response.status(customResponse.status).json(customResponse);
  }
}
