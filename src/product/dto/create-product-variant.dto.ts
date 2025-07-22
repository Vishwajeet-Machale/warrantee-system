import { IsString, IsNumber, IsBoolean, IsDateString, IsOptional, IsJSON, IsObject } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  sku_code: string;

  @IsString()
  model_no: string;

  @IsString()
  variant_name: string;

  @IsObject()
  attributes_json: object;

  @IsNumber()
  dealer_price: number;

  @IsNumber()
  MRP: number;

  @IsNumber()
  warranty_months: number;

  @IsBoolean()
  amc_available: boolean;

  @IsBoolean()
  refundable: boolean;

  @IsDateString()
  launch_date: string;

  @IsOptional()
  @IsDateString()
  discontinued_date?: string;

  @IsString()
  bar_code: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
