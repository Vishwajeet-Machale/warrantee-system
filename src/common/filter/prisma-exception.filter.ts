import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = `Duplicate entry: ${exception.meta?.target}`;
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = `Invalid foreign key reference: ${exception.meta?.field_name}`;
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = `Record not found`;
        break;
    }

    response.status(status).json({
      success: false,
      message,
      error: exception.message,
    });
  }
}
