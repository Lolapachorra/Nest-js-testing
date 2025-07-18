import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(message: string, error?: Error) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message,
        error: 'Database Error',
        cause: error?.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
