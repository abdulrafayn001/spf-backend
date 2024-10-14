import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum Currency {
  PKR = 'PKR',
  USD = 'USD',
  EUR = 'EUR',
  // Add other currencies as needed
}

export enum RiskTolerance {
  CONSERVATIVE = 'Conservative',
  MODERATE = 'Moderate',
  AGGRESSIVE = 'Aggressive',
}

@Entity()
export class UserFinancialProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Currency, default: Currency.PKR })
  preferredCurrency: Currency;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyIncome: number;

  @Column({ type: 'jsonb', nullable: true })
  financialGoals: object;

  @Column({
    type: 'enum',
    enum: RiskTolerance,
    nullable: true,
  })
  riskTolerance: RiskTolerance;

  @Column({ nullable: true })
  occupation: string;

  @Column({ default: false })
  isProfileComplete: boolean;

  @OneToOne(() => User, (user) => user.financialProfile)
  @JoinColumn()
  user: User;
}
