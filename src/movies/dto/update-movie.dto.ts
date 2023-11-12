import { IsString, MinLength } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @MinLength(2)
  movie_name?: string;

  @IsString()
  released_year?: string;

  @IsString()
  description?: string;
}
