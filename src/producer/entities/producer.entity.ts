import { Movie } from '../../movies/entities/movie.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @OneToMany(() => Movie, (movie) => movie.producer)
  movies: Movie[];
}
