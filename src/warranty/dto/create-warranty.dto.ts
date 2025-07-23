import {
    IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { WarrantyType, WarrantyTrigger } from '@prisma/client';

export class CreateWarrantyDto {
  @IsString()
  oem_account_id: string;

  @IsString()
  @IsNotEmpty()
  policy_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  is_transferable: boolean;

  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsInt()
  variant_id?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  category_ids?: number[];

  @IsInt()
  duration_months: number;

  @IsString()
  coverage_details: string;

  @IsObject()
  terms_json: object;

  @IsEnum(WarrantyType)
  type: WarrantyType;

  @IsEnum(WarrantyTrigger)
  trigger: WarrantyTrigger;

  @IsOptional()
  @IsString()
  set_conditions?: string;

  @IsNumber()
  price: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}


