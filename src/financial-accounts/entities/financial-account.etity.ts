import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AccountType {
  BANK = 'Bank',
  INVESTMENT = 'Investment',
  CREDIT_CARD = 'Credit Card',
  LOAN = 'Loan',
  CASH = 'Cash',
  OTHER = 'Other',
}

@Entity()
export class FinancialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountName: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType: AccountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  currentBalance: number;

  @Column({ nullable: true })
  institutionName: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.financialAccounts)
  user: User;
}
