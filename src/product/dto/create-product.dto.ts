import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  oem_account_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  category_id: number;

  @IsString()
  @IsOptional()
  specifications?: string;

  @IsString()
  @IsNotEmpty()
  model_no: string;
}
