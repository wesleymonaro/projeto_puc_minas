import { DojoEntity } from '../dojos/dojos.entity';
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
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => DojoEntity)
  @JoinColumn()
  dojo: DojoEntity;

  @Column()
  role: 'master' | 'dojo_admin' | 'teacher' | 'student';

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;

}
