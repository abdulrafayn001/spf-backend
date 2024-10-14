import { Module } from '@nestjs/common';
import { FinancialAccountsService } from './financial-accounts.service';
import { FinancialAccountsController } from './financial-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialAccount } from './entities/financial-account.etity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialAccount])],
  providers: [FinancialAccountsService],
  controllers: [FinancialAccountsController],
})
export class FinancialAccountsModule {}
