import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { UserRole } from 'src/interfaces/UserRole.enum';
import { AuthGuard } from '../validation/jwt.validation';
import { RolesGuard } from '../validation/roles.validation';


export function Auth(role: UserRole) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}