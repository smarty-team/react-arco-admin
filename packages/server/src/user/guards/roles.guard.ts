import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// import { ROLE } from '../constants/role.constant';
// import { ROLES_KEY } from '../decorators/role.decorator';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService

  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // if (!requiredRoles) {
    //   return true;
    // }

    // console.log('context:', context.switchToHttp())

    const { user } = context.switchToHttp().getRequest();
    console.log('RolesGuard: ', context.switchToHttp().getRequest().url)
    const { permissions } = await this.authService.info(user.id)
    // console.log('permissions', permissions)
    if (permissions) {

      // if (requiredRoles.some((role) => user.roles?.includes(role))) {
      //   return true;
      // }

      return true
    }


    throw new UnauthorizedException(
      `User with roles ${user.roles} does not have access to this route with roles ${permissions}`,
    );
  }
}
