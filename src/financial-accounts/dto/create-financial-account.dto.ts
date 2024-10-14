import {
  IsEnum,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { AccountType } from '../entities/financial-account.etity';

export class CreateFinancialAccountDto {
  @IsString({ message: 'Account name must be a string' })
  @Length(1, 100, {
    message: 'Account name must be between 1 and 100 characters',
  })
  accountName: string;

  @IsEnum(AccountType, { message: 'Invalid account type' })
  accountType: AccountType;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Current balance must be a number with at most 2 decimal places',
    },
  )
  @Min(0, { message: 'Current balance cannot be negative' })
  currentBalance: number;

  @IsOptional()
  @IsString({ message: 'Institution name must be a string' })
  @Length(1, 100, {
    message: 'Institution name must be between 1 and 100 characters',
  })
  institutionName?: string;

  @IsOptional()
  @IsString({ message: 'Account number must be a string' })
  @Length(1, 50, {
    message: 'Account number must be between 1 and 50 characters',
  })
  accountNumber?: string;

  @IsOptional()
  @IsBoolean({ message: 'Is active must be a boolean' })
  isActive?: boolean;
}
