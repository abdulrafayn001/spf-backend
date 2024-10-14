import {
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Currency, RiskTolerance } from '../entities/financial-profile.entity';

export class FinancialProfileDto {
  @IsOptional()
  @IsEnum(Currency, { message: 'Invalid currency' })
  preferredCurrency?: Currency;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Monthly income must be a number with at most 2 decimal places',
    },
  )
  @Min(0, { message: 'Monthly income cannot be negative' })
  monthlyIncome?: number;

  @IsOptional()
  @IsObject({ message: 'Financial goals must be an object' })
  financialGoals?: object;

  @IsOptional()
  @IsEnum(RiskTolerance, { message: 'Invalid risk tolerance' })
  riskTolerance?: RiskTolerance;

  @IsOptional()
  @IsString({ message: 'Occupation must be a string' })
  @Max(100, { message: 'Occupation cannot be longer than 100 characters' })
  occupation?: string;
}
