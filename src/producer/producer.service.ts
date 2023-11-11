import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto) {
    try {
      return await this.producerRepository.save(createProducerDto);
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }

  async findAll() {
    try {
      return await this.producerRepository.find();
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.producerRepository.findOneBy({ id });
      if (!result) {
        throw new BadRequestException({ message: 'Not results' });
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }

  async update(
    id: number,
    updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    const existingProducer = await this.findOne(id);

    if (!existingProducer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
    const updatedProducer = { ...existingProducer, ...updateProducerDto };
    await this.producerRepository.save(updatedProducer);
    return updatedProducer;
  }

  async remove(id: number) {
    try {
      const producer = await this.findOne(id);
      if (!producer) {
        throw new BadRequestException({ message: 'Producer does not exist' });
      }
      return this.producerRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException({ message: error.detail });
    }
  }
}
