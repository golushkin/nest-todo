import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let error: any = {
      name: 'Unknown'
    }
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      error = exception.getResponse()
      httpStatus = exception.getStatus()
    }
    else if (exception instanceof Error){
      error = {
        name: exception.name,
        message: exception.message,
        stack: exception.stack,
      }
    }
  
    const responseBody = {
      success: false,
      error
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}



export const getGlobalFilters = (httpAdapterHost: HttpAdapterHost): ExceptionFilter<any>[] => {
  return [new AllExceptionsFilter(httpAdapterHost)]
}