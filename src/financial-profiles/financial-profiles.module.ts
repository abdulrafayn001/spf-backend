import { Module } from '@nestjs/common';
import { FinancialProfilesService } from './financial-profiles.service';
import { FinancialProfilesController } from './financial-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFinancialProfile } from './entities/financial-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFinancialProfile])],
  providers: [FinancialProfilesService],
  controllers: [FinancialProfilesController],
})
export class FinancialProfilesModule {}
