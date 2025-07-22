import { Controller, Post, Body } from '@nestjs/common';
import { CreateOemDto } from './dto/create-oem.dto';
import { OemService } from './oem.service';
import { ApiResponse } from 'src/common/utils/response';

@Controller('oem')
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



}
