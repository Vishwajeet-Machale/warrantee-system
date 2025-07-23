import { PartialType } from '@nestjs/mapped-types';
import { CreateAmcDto } from './create-amc.dto';

export class UpdateAmcDto extends PartialType(CreateAmcDto) {}
