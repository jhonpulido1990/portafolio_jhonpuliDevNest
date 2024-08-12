import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  duration: string;

  @Column('text', { array: true })
  responsabilities: string[];

  @Column('text', { array: true })
  achievements: string[];

  @Column({ nullable: true })
  testimonial?: string;
}
