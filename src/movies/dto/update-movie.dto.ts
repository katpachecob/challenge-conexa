import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  movie_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  released_year?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;


}