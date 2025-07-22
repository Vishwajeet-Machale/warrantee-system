import { IsInt, IsString, IsOptional, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { UserType } from '@prisma/client'; 



export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserType)
  user_type: UserType;

  @IsInt()
  role_id: number; 

  @IsOptional()
  @IsString()
  oem_account_id?: string;

  @IsOptional()
  @IsString()
  service_agency_id?: string;
}

