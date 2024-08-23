import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import {
  BaseAppExceptionsFilter,
  ErrorRepresentation,
} from '../exceptions/base.exception';
import { CustomLogger } from '../logger/logger.service';

@Catch()
export class SentryFilter extends BaseAppExceptionsFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    logger: CustomLogger,
  ) {
    super(logger);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    // Send the exception to Sentry
    Sentry.captureException(exception);

    // Log the exception using BaseAppExceptionsFilter's logic
    super.catch(exception as Error, host);

    // Extract response and request objects
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Determine status code based on the exception
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Build the response body
    const responseBody = new ErrorRepresentation(
      'An error has occurred, unable to handle request!',
      [exception instanceof Error ? exception.message : 'Unknown error'],
      status,
    );

    // Send the response
    httpAdapter.reply(response, responseBody, status);
  }
}
