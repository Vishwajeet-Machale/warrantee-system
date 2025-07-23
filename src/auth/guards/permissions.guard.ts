import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<any[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user; // populated from JWT AuthGuard
    console.log('PermissionsGuard - user:', user);

    if (!user) throw new UnauthorizedException();

    // ✅ Step 1: Check user_type (dynamic)
    const requiredUserType = requiredPermissions.find((perm) => perm.user_type);
    if (requiredUserType && user.user_type !== requiredUserType.user_type) {
      throw new ForbiddenException(`Access denied for user type: ${user.user_type}`);
    }

    // ✅ Step 2: Check for required feature + access level
    for (const permission of requiredPermissions) {
      const hasPermission = user.permissions?.some((userPerm) => {
        return (
          userPerm.feature === permission.feature &&
          this.hasAccessLevel(userPerm.access, permission.access)
        );
      });

      if (!hasPermission) {
        throw new ForbiddenException(
          `Missing permission: ${permission.feature} with access: ${permission.access}`,
        );
      }
    }

    // ✅ Step 3: Check ownership via OEM if needed (optional in controller)
    return true;
  }

  // Helper: access level hierarchy
  private hasAccessLevel(userAccess: string, requiredAccess: string): boolean {
    const levels = ['READ', 'WRITE', 'MANAGE'];
    return levels.indexOf(userAccess) >= levels.indexOf(requiredAccess);
  }
}
