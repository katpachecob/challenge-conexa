import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @MinLength(2)
  movie_name?: string;

  @IsString()
  released_year?: string;

  @IsString()
  cover_picture?: string;

  @IsString()
  description?: string;
}
