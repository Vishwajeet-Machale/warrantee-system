import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString, IsArray } from 'class-validator';

export class CreateAmcDto {
  @IsString()
  oem_account_id: string;
 
 
  @IsString()
  plan_name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  product_id?: number;

  @IsOptional()
  @IsNumber()
  variant_id?: number;

  @IsOptional()
  @IsArray()
  category_ids?: number[];

  @IsNumber()
  price: number;

  @IsNumber()
  duration_months: number;

  @IsOptional()
  benefits_json: any;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  renewal_options?: string;

  @IsString()
  eligibility: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}
