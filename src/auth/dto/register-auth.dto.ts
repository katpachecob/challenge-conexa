import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength, IsEnum, IsEmail, Matches } from "class-validator";

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @Matches(/^[A-Za-z]+$/, {
    message: 'Last name must contain only alphabetic characters',
  })
  first_name: string;

  @IsString()
  @MinLength(2)
  @Matches(/^[A-Za-z]+$/, {
    message: 'Last name must contain only alphabetic characters',
  })
  last_name: string;

}
