import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Producer } from 'src/producer/entities/producer.entity';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  movie_name: string;

  @IsString()
  @IsNotEmpty()
  released_year: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  producer: string
}
