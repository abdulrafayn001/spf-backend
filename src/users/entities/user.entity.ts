import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { FinancialAccount } from 'src/financial-accounts/entities/financial-account.etity';
import { UserFinancialProfile } from 'src/financial-profiles/entities/financial-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  occupation: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => UserFinancialProfile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  financialProfile: UserFinancialProfile;

  @OneToMany(() => FinancialAccount, (account) => account.user)
  financialAccounts: FinancialAccount[];
}
