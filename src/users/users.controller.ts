import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../configuration/decorator/auth.decorator';
import { UserRole } from '../interfaces/UserRole.enum';
import { ActiveUserInterface } from '../interfaces/IActiveUser';
import { ActiveUser } from '../utils/ActiveUser';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Auth(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  //If your account is an admin you can edit any user but if you are a user you can only edit your information

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    if (user.role == UserRole.ADMIN) {
      return this.usersService.update(+id, updateUserDto);
    }
    else {
      return this.usersService.update(user.user_id, updateUserDto);
    }
  }

  @Auth(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
