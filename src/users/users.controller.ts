import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/configuration/decorator/auth.decorator';
import { UserRole } from 'src/interfaces/UserRole.enum';
import { ActiveUserInterface } from 'src/interfaces/IActiveUser';
import { ActiveUser } from 'src/utils/ActiveUser';
import { ApiTags } from '@nestjs/swagger';


@Auth(UserRole.USUARIO)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
console.log(user)
    return this.usersService.update(id, updateUserDto);
  }
  

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}