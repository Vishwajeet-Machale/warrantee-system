import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'required_permissions';

export const Permissions = (...permissions: Array<{ feature: string; access: string; user_type?: string }>) =>
  SetMetadata(PERMISSIONS_KEY, permissions);