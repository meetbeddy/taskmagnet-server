import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly members?: string[];

  @IsMongoId()
  @IsNotEmpty()
  readonly owner: string;
}
