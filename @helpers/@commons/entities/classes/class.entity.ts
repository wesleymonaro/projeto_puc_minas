import { DojoEntity } from '../dojos/dojos.entity';
import { TeacherEntity } from '../teachers/teachers.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'classes' })
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weekDay: string;

  @Column()
  initHour: string;

  @Column()
  endHour: string;

  @Column()
  category: string;

  @Column()
  maxStudents: number;

  @OneToOne(() => DojoEntity)
  @JoinColumn()
  dojo: DojoEntity;

  @OneToOne(() => TeacherEntity)
  @JoinColumn()
  teacher: TeacherEntity;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;


}
