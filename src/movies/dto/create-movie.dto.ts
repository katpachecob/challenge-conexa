import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsOptional()
  producer?: string;
}
