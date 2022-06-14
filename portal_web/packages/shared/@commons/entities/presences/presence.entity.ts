import { DojoEntity } from '../dojos/dojos.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ClassEntity } from '../classes/class.entity';
import { StudentEntity } from '../students/students.entity';

@Entity({ name: 'presences' })
export class PresenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DojoEntity)
  @JoinColumn()
  dojo: DojoEntity;

  @OneToOne(() => StudentEntity)
  @JoinColumn()
  student: StudentEntity;

  @Column()
  confirmedByUserId: number;

  @OneToOne(() => ClassEntity)
  @JoinColumn()
  class: ClassEntity;

  @Column()
  date: string;

  @Column({ default: 2 })
  status: number;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
