import { AddressEntity } from '../address/address.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({
  name: 'dojos',
})
export class DojoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  logo: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
