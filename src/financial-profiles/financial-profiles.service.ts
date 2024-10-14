import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFinancialProfile } from './entities/financial-profile.entity';
import { Repository } from 'typeorm';
import { FinancialProfileDto } from './dto/financial-profile.dto';

@Injectable()
export class FinancialProfilesService {
  constructor(
    @InjectRepository(UserFinancialProfile)
    private financialProfileRepository: Repository<UserFinancialProfile>,
  ) {}

  async updateFinancialProfile(
    userId: number,
    updateFinancialProfileDto: FinancialProfileDto,
  ): Promise<UserFinancialProfile> {
    let profile = await this.financialProfileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      profile = this.financialProfileRepository.create({
        user: { id: userId },
      });
    }

    Object.assign(profile, updateFinancialProfileDto);

    // Check if profile is complete
    const requiredFields: (keyof UserFinancialProfile)[] = [
      'preferredCurrency',
      'monthlyIncome',
      'riskTolerance',
    ];
    profile.isProfileComplete = requiredFields.every(
      (field) => profile[field] != null,
    );

    return this.financialProfileRepository.save(profile);
  }

  async getFinancialProfile(userId: number): Promise<UserFinancialProfile> {
    const profile = await this.financialProfileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new NotFoundException(
        `Financial profile not found for user with id ${userId}`,
      );
    }

    return profile;
  }
}
