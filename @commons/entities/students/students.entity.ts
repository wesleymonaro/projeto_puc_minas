import { AddressEntity } from '../address/address.entity';
import { BeltEntity } from '../belt/belt.entity';
import { BeltDegreeColorEntity } from '../belt_degree_color/belt_degree_color.entity';
import { DojoEntity } from '../dojos/dojos.entity';
import { UserEntity } from '../users/user.entity';
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
  name: 'students',
})
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthdate: Date;

  @Column()
  photo: string;

  @Column()
  paymentDate: string;

  @Column()
  observations: string;

  @Column({ default: true })
  notifyDueDate: boolean;

  @Column({ default: Date.now() })
  startsFightAt: Date;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;

  @OneToOne(() => BeltEntity)
  @JoinColumn()
  belt: BeltEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => BeltDegreeColorEntity)
  @JoinColumn()
  beltDegreeColor: BeltDegreeColorEntity;

  @OneToOne(() => DojoEntity)
  @JoinColumn()
  dojo: DojoEntity;

  @Column()
  planId: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
