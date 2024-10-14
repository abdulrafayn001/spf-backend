import {
  IsString,
  IsOptional,
  IsDate,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'Occupation cannot be longer than 100 characters',
  })
  occupation?: string;
}
