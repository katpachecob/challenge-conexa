import { Producer } from '../../producer/entities/producer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  movie_name: string;

  @Column({ default: 'Not defined' })
  released_year: string;

  @Column()
  cover_picture: string;

  @Column()
  description: string;

  @ManyToOne(() => Producer, (producer) => producer.movies, { eager: true })
  producer: Producer;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
