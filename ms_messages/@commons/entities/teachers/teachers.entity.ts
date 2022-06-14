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
  name: 'teachers',
})
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => DojoEntity)
  @JoinColumn()
  dojo: DojoEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => BeltEntity)
  @JoinColumn()
  belt: BeltEntity;

  @OneToOne(() => BeltDegreeColorEntity)
  @JoinColumn()
  beltDegreeColor: BeltDegreeColorEntity;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
