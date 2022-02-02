import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { STATUS_CODES } from 'http';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      ...exception.getResponse(),
      statusCode: status,
      error: STATUS_CODES[status],
      timestamp: new Date().toISOString(),
      message: exception.message ?? 'A server error occurred!',
      path: request.url,
    });
  }
}
