import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
