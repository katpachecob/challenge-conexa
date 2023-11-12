import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ActiveUser } from '../utils/ActiveUser';
import { UserRole } from '../interfaces/UserRole.enum';
import { Auth } from '../configuration/decorator/auth.decorator';
import { ActiveUserInterface } from '../interfaces/IActiveUser';
import { ApiTags } from '@nestjs/swagger';
import { ForgotAuthDto } from './dto/forgot-auth.dto';
import { ValidationAuthDto } from './dto/validation-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(
    @Body()
    registerDto: RegisterAuthDto,
  ) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body()
    loginDto: LoginAuthDto,
  ) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@ActiveUser() user: ActiveUserInterface) {
    return this.authService.profile(user);
  }

  @Post('reset')
  forgotPassword(@Body() forgotDto: ForgotAuthDto) {
    return this.authService.forgotPassword(forgotDto);
  }

  @Post('validation')
  validationCode(@Body() validationDto: ValidationAuthDto) {
    return this.authService.validationCode(validationDto);
  }
}
