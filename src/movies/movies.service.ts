import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,

} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Producer } from '../producer/entities/producer.entity';
import searchHelper from 'src/utils/api-open';
import { ActiveUserInterface } from 'src/interfaces/IActiveUser';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) { }

  //Create a movie
  async create(createMovieDto: CreateMovieDto) {


       const producer = await this.validateProducer(createMovieDto.producer )
        if (!producer) {
          throw new BadRequestException('Producer not found');
        }

      return await this.movieRepository.save({
        ...createMovieDto,
        producer: producer,
      });
   
  }

  //Find all the movies
  async findAll() {
    try {
      return await this.movieRepository.find();
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }

  async findHelper(movie: string) {
    const findProducer = await searchHelper(movie);
    return findProducer;
  }

  //Find a movie
  async findOne(id: number) {
    try {
      const result = await this.movieRepository.find({
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new BadRequestException({ message: 'Not results' });
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {

      const existingMovie = await this.movieRepository.findOneBy({ id });
      if (!existingMovie) {
        throw new BadRequestException({ message: 'Not results' });
      }

      return await this.movieRepository.update(id, {
        ...updateMovieDto,
        producer: updateMovieDto.producer ? await this.validateProducer( updateMovieDto.producer ) : undefined,
      })
 
  }



  //Delete a movie
  async remove(id: number) {
    try {
      const movie = await this.movieRepository.findOneBy({ id });
      if (!movie) {
        throw new BadRequestException({ message: 'Movie does not exist' });
      }
      return this.movieRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }
  
  private async validateProducer(producer: string) {
    const producerEntity = await this.producerRepository.findOneBy({ name: producer });
  
    if (!producerEntity) {
      throw new BadRequestException('Producer not found');
    }
  
    return producerEntity;
  }

}
