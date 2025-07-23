import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateOemDto } from './dto/create-oem.dto';
import { OemService } from './oem.service';
import { ApiResponse } from 'src/common/utils/response';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('oem')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Permissions({ feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' })
export class OemController {
  constructor(private readonly oemService: OemService) {}

@Post('create-oem')
async register(@Body() dto: CreateOemDto) {
  try {
    const result = await this.oemService.createOem(dto);
    return ApiResponse.success('OEM registration successful', result);
  } catch (error) {
    return ApiResponse.error('OEM registration failed', error.message);
  }
}

 @Post('change-role-permissions')
  async updateRolePermissions(@Body() dto: UpdateRolePermissionDto) {
    const result = await this.oemService.updateRolePermissions(dto);
    return ApiResponse.success('Role permissions updated successfully', result);
  }

  @Post('change-admin-role-permissions')
  @Permissions({ feature: 'ADD_PRODUCT', access: 'READ', user_type: 'SUPER_ADMIN' })
  async updateAdminRolePermissions(@Body() dto: UpdateRolePermissionDto) {
    const result = await this.oemService.updateAdminRolePermissions(dto);
    return ApiResponse.success('Role permissions updated successfully', result);
  }

  @Post('create-role')
async createRole(@Body() dto: CreateRoleDto) {
  const result = await this.oemService.createRole(dto);
  return ApiResponse.success('Role created successfully', result);
}



}
