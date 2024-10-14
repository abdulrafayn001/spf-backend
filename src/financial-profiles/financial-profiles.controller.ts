import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { FinancialProfilesService } from './financial-profiles.service';
import { FinancialProfileDto } from './dto/financial-profile.dto';
import { UserFinancialProfile } from './entities/financial-profile.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

@Controller('financial-profiles')
@UseGuards(JwtAuthGuard)
export class FinancialProfilesController {
  constructor(
    private readonly financialProfilesService: FinancialProfilesService,
  ) {}

  @Get()
  async getFinancialProfile(
    @Req() req: AuthenticatedRequest,
  ): Promise<UserFinancialProfile> {
    return this.financialProfilesService.getFinancialProfile(req.user.userId);
  }

  @Put()
  async updateFinancialProfile(
    @Req() req: AuthenticatedRequest,
    @Body() financialProfileDto: FinancialProfileDto,
  ): Promise<UserFinancialProfile> {
    return this.financialProfilesService.updateFinancialProfile(
      req.user.userId,
      financialProfileDto,
    );
  }
}
