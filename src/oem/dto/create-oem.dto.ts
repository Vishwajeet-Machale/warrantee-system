// src/oem/dto/create-oem.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateOemDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  gst_number: string;

  @IsEmail()
  contact_email: string;

  @IsNotEmpty()
  @IsString()
  support_number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsEmail()
  created_by: string;

  @IsNotEmpty()
  @IsString()
  admin_name: string;

  @IsEmail()
  admin_email: string;

  @IsNotEmpty()
  @IsString()
  admin_phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role_name: string;

  @IsArray()
 features: { featureId: number; accessType: 'READ' | 'WRITE' | 'MANAGE' }[];

}