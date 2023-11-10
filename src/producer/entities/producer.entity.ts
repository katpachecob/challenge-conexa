
import { Movie } from 'src/movies/entities/movie.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Movie, movie => movie.producer)
  movies: Movie[];
}
