import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ActiveUser } from 'src/utils/ActiveUser';
import { UserRole } from 'src/interfaces/UserRole.enum';
import { Auth } from 'src/configuration/decorator/auth.decorator';
import { ActiveUserInterface } from 'src/interfaces/IActiveUser';
import { AuthGuard } from 'src/configuration/validation/jwt.validation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
  @Auth(UserRole.USUARIO)
  getProfile(@ActiveUser() user: ActiveUserInterface) {
    return this.authService.profile(user);
  }

  // @Post('reset')
  // forgotPassword(@Body() forgotDto: ForgotAuthDto) {
  //   return this.authService.forgotPassword(forgotDto)
  // }

  // @Patch('change')
  // updatePassword(@Body() updateDto: ForgotAuthDto) {
  //   return this.authService.updatePassword(updateDto)
  // }

  
  // @Post('validation')
  // validationCode(@Body() validationDto: ValidationCodeDto) {
  //   return this.authService.validationCode(validationDto)
  // }

}