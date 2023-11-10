import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './register-auth.dto';

export class ForgotAuthDto extends PartialType(RegisterAuthDto) {}
