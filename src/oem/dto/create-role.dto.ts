import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AccessType } from '@prisma/client';

class FeatureAccessDto {
  @IsNotEmpty()
  featureId: number;

  @IsEnum(AccessType)
  accessType: AccessType;
}

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  oem_account_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureAccessDto)
  features: FeatureAccessDto[];
}
