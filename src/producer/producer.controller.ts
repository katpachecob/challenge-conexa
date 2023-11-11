import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Auth } from '..//configuration/decorator/auth.decorator';
import { UserRole } from '../interfaces/UserRole.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('producers')
@ApiTags('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  update(
    @Param('id') id: number,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.producerService.remove(id);
  }
}
