import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotAuthDto } from './dto/forgot-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { forgotPass } from './templates/forgot-pass.template';
import { generateRandomPassword } from '../utils/generateRandomPassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({email, first_name,last_name, password}: RegisterAuthDto) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user) {
        throw new BadRequestException({ message: 'Email register already' });
      }
      return await this.usersService.create({
        email,
        first_name,
        last_name,
        password: await bcrypt.hash(password, 10),
      });
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
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
        throw new UnauthorizedException('Password Incorrect');
      }
      const payload = { email: user.email, role: user.role, user_id: user.id };
      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        email,
      };
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }

  async profile({ email }: { email: string }) {
    try {
      return await this.usersService.findOneByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }

  async forgotPassword({ email }: ForgotAuthDto) {
    try {
      const actualDate = new Date();
      actualDate.setMinutes(actualDate.getMinutes() + 20);
      const formatDate = actualDate.toISOString().replace(/[-:.TZ]/g, '');
      const user = await this.usersService.findOneByEmail(email);

      if (user) {
        const temporalPass = await generateRandomPassword();
        await this.usersService.update(user.id, {
          ...user,
          password: temporalPass + formatDate,
        });
        this.mailerService.sendMail({
          to: email,
          from: 'katherinepb1403@gmail.com',
          subject: 'Recovery password',
          text: "Here's the code",
          html: forgotPass(temporalPass),
        });
      } else {
        throw new BadRequestException('Usuario no encontrado');
      }
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }

  async validationCode({
    code,
    email,
    newPassword,
  }: {
    code: string;
    email: string;
    newPassword: string;
  }) {
    try {
      const user = await this.usersService.findByEmailWithPassword(email);
      const formatDate = new Date().toISOString().replace(/[-:.TZ]/g, '');
      const date = user.password.slice(6);
      const temporalCode = user.password.slice(0, 6);
      if (temporalCode !== code) {
        throw new UnauthorizedException({ message: 'Invalid Code' });
      } else if (date <= formatDate) {
        throw new UnauthorizedException({ message: 'Expired Code' });
      } else {
        await this.usersService.update(user.id, {
          ...user,
          password: await bcrypt.hash(newPassword, 10),
        });
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }
}
