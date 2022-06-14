import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'belt_degree_colors' })
export class BeltDegreeColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;
}
