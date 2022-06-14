import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  complement: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  zip: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
