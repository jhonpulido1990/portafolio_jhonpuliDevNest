import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  technologies: string[];

  @Column()
  role: string;

  @Column()
  imageUrl: string;

  @Column()
  demoLink?: string;

  @Column()
  repoLink?: string;

  @Column()
  videoLink?: string;
}
