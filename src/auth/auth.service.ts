import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotAuthDto } from './dto/forgot-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { forgotPass } from './templates/forgot-pass.template';
import { generateRandomPassword } from 'src/utils/generateRandomPassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(body: RegisterAuthDto) {
    try {
      const user = await this.usersService.findOneByEmail(body.email);
      if (user) {
        throw new BadRequestException({ message: 'Email registrado' });
      }
      await this.usersService.create({
        ...body,
        password: await bcrypt.hash(body.password, 10),
      });
      return {
        message: "Usuario creado",
      };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login({ email, password }: LoginAuthDto) {
    try {
      const user = await this.usersService.findByEmailWithPassword(email);
      if (!user) {
        throw new UnauthorizedException('Email incorrecto');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña Incorrecta');
      }
      const payload = { email: user.email, role: user.role, user_id: user.id };
      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        email,
      };
    }
    catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }

  // async forgotPassword({ email }: ForgotAuthDto) {
  //   const actualDate = new Date();
  //   actualDate.setMinutes(actualDate.getMinutes() + 20);
  //   const formatDate = actualDate.toISOString().replace(/[-:.TZ]/g, '');
  //   const user = await this.usersService.findOneByEmail(email);

  //   if (user) {
  //     const temporalPass = await generateRandomPassword()
  //     await this.usersService.update(user.id, {
  //       ...user,
  //       password: temporalPass + formatDate,
  //     });
  //     this.mailerService.sendMail({
  //       to:email, 
  //       from: "katherinepb1403@gmail.com",
  //       subject: "Recuperar contraseña",
  //       text: "this a test",
  //       html: forgotPass(temporalPass)
  //     })

  //   }
  //   else {
  //     throw new BadRequestException('Usuario no encontrado')
  //   }
  // }

  // async updatePassword(updateDto: ForgotAuthDto) {
  //   const user = await this.usersService.findByEmailWithPassword(updateDto.email)
  //     await this.usersService.update(user.id, {
  //       ...user,
  //       password: await bcrypt.hash(updateDto.password, 10),
  //     });
  //     return 'Success'
  // }
  
  // async validationCode({ code, email }: { code: string, email: string }) {
  //   const { password } = await this.usersService.findByEmailWithPassword(email)
  //   const formatDate = new Date().toISOString().replace(/[-:.TZ]/g, '');
  //   const date = password.slice(6)
  //   const temporalCode = password.slice(0, 6)
  //   if (date <= formatDate) {
  //     throw new UnauthorizedException("Codigo expirado")
  //   } else {
  //     if (temporalCode !== code) {
  //       throw new UnauthorizedException("Codigo incorrecto")
  //     } else {
  //       return { message: 'Success' }
  //     }
  //   }
  // }
}