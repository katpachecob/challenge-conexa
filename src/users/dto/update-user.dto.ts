import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from '../../auth/dto/register-auth.dto';

export class UpdateUserDto extends PartialType(RegisterAuthDto) {}
