import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'belts' })
export class BeltEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;
}
