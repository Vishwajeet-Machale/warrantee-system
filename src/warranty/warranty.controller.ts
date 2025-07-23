import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { ApiResponse } from 'src/common/utils/response';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Controller('warranty')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Permissions({ feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' })
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  async create(@Body() dto: CreateWarrantyDto) {
    const data = await this.warrantyService.create(dto);
    return ApiResponse.success('Warranty policy created successfully', data);
  }

  @Get()
  async findAll() {
    const data = await this.warrantyService.findAll();
    return ApiResponse.success('All warranty policies fetched', data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.warrantyService.findOne(id);
    return ApiResponse.success('Warranty policy fetched', data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWarrantyDto) {
    const data = await this.warrantyService.update(id, dto);
    return ApiResponse.success('Warranty policy updated', data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.warrantyService.delete(id);
    return ApiResponse.success('Warranty policy deleted', data);
  }
}
