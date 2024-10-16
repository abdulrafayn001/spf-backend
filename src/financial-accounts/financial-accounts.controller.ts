import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FinancialAccountsService } from './financial-accounts.service';
import { CreateFinancialAccountDto } from './dto/create-financial-account.dto';
import { UpdateFinancialAccountDto } from './dto/update-financial-account.dto';
import { FinancialAccount } from './entities/financial-account.etity';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('financial-accounts')
@UseGuards(JwtAuthGuard)
export class FinancialAccountsController {
  constructor(
    private readonly financialAccountsService: FinancialAccountsService,
  ) {}

  @Post()
  async createFinancialAccount(
    @Req() req: AuthenticatedRequest,
    @Body() createFinancialAccountDto: CreateFinancialAccountDto,
  ): Promise<FinancialAccount> {
    return this.financialAccountsService.createFinancialAccount(
      req.user.userId,
      createFinancialAccountDto,
    );
  }

  @Get()
  async getFinancialAccounts(
    @Req() req: AuthenticatedRequest,
  ): Promise<FinancialAccount[]> {
    return this.financialAccountsService.getFinancialAccounts(req.user.userId);
  }

  @Put(':id')
  async updateFinancialAccount(
    @Param('id') id: number,
    @Body() updateFinancialAccountDto: UpdateFinancialAccountDto,
  ): Promise<FinancialAccount> {
    return this.financialAccountsService.updateFinancialAccount(
      id,
      updateFinancialAccountDto,
    );
  }

  //   @Delete(':id')
  //   async deleteFinancialAccount(@Param('id') id: number): Promise<void> {
  //     return this.financialAccountsService.deleteFinancialAccount(id);
  //   }
}
