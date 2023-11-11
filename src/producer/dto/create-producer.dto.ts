import { IsString, MinLength } from 'class-validator';

export class CreateProducerDto {
  @IsString()
  @MinLength(3)
  name: string;
}
