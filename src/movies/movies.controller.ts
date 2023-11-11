import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Auth } from '../configuration/decorator/auth.decorator';
import { UserRole } from '../interfaces/UserRole.enum';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiBearerAuth()
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Auth(UserRole.ADMIN)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moviesService.findOne(id);
  }

  @Auth(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovies: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovies);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}
