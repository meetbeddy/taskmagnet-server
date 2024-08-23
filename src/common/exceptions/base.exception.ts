import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomLogger } from '../logger/logger.service';
import { AppInputException } from './app-input.exception';
import { AppException } from './app.exception';
import { ValidationErrorRepresentation } from './validation-error';
import { ApiProperty } from '@nestjs/swagger';

@Catch()
export class BaseAppExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(error: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();
    let payload: ErrorRepresentation;
    let code: number;

    switch (true) {
      case error instanceof BadRequestException: {
        const ex = <any>error;
        code = 400;
        payload = new ErrorRepresentation(
          error.message,
          ex.response.message as unknown as ValidationErrorRepresentation[],
          code,
        );
        break;
      }
      case error instanceof AppInputException: {
        const ex = <AppInputException>error;
        code = 400;
        payload = new ErrorRepresentation(
          error.message,
          ex.validationErrors,
          code,
        );
        break;
      }
      case error instanceof AppException: {
        this.logger.error(error.message, error.stack);
        code = 400;
        payload = new ErrorRepresentation(error.message, error?.data, code);
        break;
      }
      case error instanceof UnauthorizedException: {
        this.logger.error(error.message, error.stack);
        code = 401;
        payload = new ErrorRepresentation(error.message, [], code);
        break;
      }
      case error instanceof ForbiddenException: {
        this.logger.error(error.message, error.stack);
        code = 403;
        payload = new ErrorRepresentation(error.message, [], code);
        break;
      }
      case error instanceof NotFoundException: {
        this.logger.error(error.message, error.stack);
        code = 404;
        payload = new ErrorRepresentation(error.message, [], code);
        break;
      }
      case error instanceof InternalServerErrorException: {
        this.logger.error(error.message, error.stack);
        code = 500;
        payload = new ErrorRepresentation(error.message, [], code);
        break;
      }
      default: {
        this.logger.error(error.message, error.stack);
        code = 500;
        payload = new ErrorRepresentation(
          'An error has occurred, unable to handle request!',
          [error.message],
          code,
        );
      }
    }

    response.status(code).json(payload);
  }
}

export class ErrorRepresentation {
  @ApiProperty()
  readonly data: Array<[]>;

  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;

  constructor(message: string, data: any = null, statusCode: number) {
    this.data = data == null ? [] : data;
    this.statusCode = statusCode;
    this.message = message;
  }
}
