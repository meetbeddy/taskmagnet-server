import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorRepresentation {
  @ApiProperty()
  readonly description!: string;

  @ApiProperty({ required: false })
  readonly field?: string;
}
