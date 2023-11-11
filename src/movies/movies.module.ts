import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ProducerModule } from '../producer/producer.module';
import { ProducerService } from '../producer/producer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), ProducerModule],
  controllers: [MoviesController],
  providers: [MoviesService, ProducerService],
})
export class MoviesModule {}
