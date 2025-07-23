import { IsNotEmpty, IsString, IsArray, IsEnum, IsNumber } from 'class-validator';
import { AccessType } from '@prisma/client';

export class UpdateRolePermissionDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsArray()
  features: {
    featureId: number;
    accessType: AccessType; // 'READ' | 'WRITE' | 'MANAGE'
  }[];
}