import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AmcService } from './amc.service';
import { CreateAmcDto } from './dto/create-amc.dto';
import { UpdateAmcDto } from './dto/update-amc.dto';
import { ApiResponse } from 'src/common/utils/response';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Controller('amc')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Permissions({ feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' })
export class AmcController {
  constructor(private readonly amcService: AmcService) {}

  @Post()
  async create(@Body() dto: CreateAmcDto) {
    const data = await this.amcService.create(dto);
    return ApiResponse.success('AMC plan created successfully', data);
  }

  @Get()
  async findAll() {
    const data = await this.amcService.findAll();
    return ApiResponse.success('All AMC plans fetched', data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.amcService.findOne(id);
    return ApiResponse.success('AMC plan fetched', data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAmcDto) {
    const data = await this.amcService.update(id, dto);
    return ApiResponse.success('AMC plan updated', data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.amcService.delete(id);
    return ApiResponse.success('AMC plan deleted', data);
  }
}
// This controller handles CRUD operations for AMC plans.