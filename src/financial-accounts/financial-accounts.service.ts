import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialAccount } from './entities/financial-account.etity';
import { Repository } from 'typeorm';
import { CreateFinancialAccountDto } from './dto/create-financial-account.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial-account.dto';

@Injectable()
export class FinancialAccountsService {
  constructor(
    @InjectRepository(FinancialAccount)
    private financialAccountRepository: Repository<FinancialAccount>,
  ) {}

  async createFinancialAccount(
    userId: number,
    createFinancialAccountDto: CreateFinancialAccountDto,
  ): Promise<FinancialAccount> {
    const account = this.financialAccountRepository.create({
      ...createFinancialAccountDto,
      user: { id: userId },
    });
    return this.financialAccountRepository.save(account);
  }

  async updateFinancialAccount(
    accountId: number,
    updateFinancialAccountDto: UpdateFinancialAccountDto,
  ): Promise<FinancialAccount> {
    const account = await this.financialAccountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new NotFoundException('Financial account not found');

    Object.assign(account, updateFinancialAccountDto);
    return this.financialAccountRepository.save(account);
  }

  async getFinancialAccounts(userId: number): Promise<FinancialAccount[]> {
    return this.financialAccountRepository.find({
      where: { user: { id: userId } },
    });
  }
}
