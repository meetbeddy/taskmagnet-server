import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class StandardResponseDto<T> {
  data!: T;

  @ApiProperty({
    type: String,
  })
  statusCode!: number;

  @ApiProperty({
    type: String,
  })
  message!: string;
}

export function successResponse<T>(
  data: T,
  options?: {
    message?: string;
    statusCode?: number;
  },
): StandardResponseDto<T> {
  return {
    data,
    statusCode:
      options && options.statusCode ? options.statusCode : HttpStatus.OK,
    message: options && options.message ? options.message : 'OK!',
  };
}

export function errorResponse<T>(
  data: T,
  options?: {
    message?: string;
    statusCode?: number;
  },
): StandardResponseDto<T> {
  return {
    data,
    statusCode:
      options && options.statusCode
        ? options.statusCode
        : HttpStatus.BAD_REQUEST,
    message: options && options.message ? options.message : 'Bad Request!',
  };
}
