import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidationAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
