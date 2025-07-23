import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Get,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ApiResponse } from '../common/utils/response';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'),PermissionsGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ----- Category CRUD -----
 @Post('product-category')
 @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async createCategory(@Body() dto: CreateProductCategoryDto) {
    const result = await this.productService.addCategory(dto);
    return ApiResponse.success('Product category created successfully', result);
  }

  @Get('variant')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
async getAllVariants() {
  const data = await this.productService.getAllVariants();
  return ApiResponse.success('Product variants fetched successfully', data);
}

@Get('product-category')
@Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
async getAllCategories() {
  const data = await this.productService.getAllCategories();
  return ApiResponse.success('Product categories fetched successfully', data);
}

  @Put('product-category/:id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductCategoryDto,
  ) {
    const result = await this.productService.updateCategory(id, dto);
    return ApiResponse.success('Product category updated successfully', result);
  }

  @Delete('product-category/:id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productService.deleteCategory(id);
    return ApiResponse.success('Product category deleted successfully', result);
  }

  // ----- Product CRUD -----
 @Post()
 @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async createProduct(@Body() dto: CreateProductDto) {
    const result = await this.productService.createProduct(dto);
    return ApiResponse.success('Product created successfully', result);
  }

  @Get()
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
async getAllProducts() {
  const data = await this.productService.getAllProducts();
  return ApiResponse.success('Products fetched successfully', data);
}


  @Get(':id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    return ApiResponse.success('Product fetched successfully', product);
  }

  @Put(':id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    const updated = await this.productService.updateProduct(id, dto);
    return ApiResponse.success('Product updated successfully', updated);
  }

  @Delete(':id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
    return ApiResponse.success('Product deleted successfully');
  }

  // ----- ProductVariant CRUD -----

 

  @Post(':productId/variant')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async createVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateProductVariantDto,
  ) {
    const variant = await this.productService.createVariant(productId, dto);
    return ApiResponse.success('Product variant created successfully', variant);
  }

 

  @Get('variant/:id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async getVariantById(@Param('id', ParseIntPipe) id: number) {
    const variant = await this.productService.getVariantById(id);
    return ApiResponse.success('Product variant fetched successfully', variant);
  }

  @Put('variant/:id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async updateVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductVariantDto,
  ) {
    const updated = await this.productService.updateVariant(id, dto);
    return ApiResponse.success('Product variant updated successfully', updated);
  }

  @Delete('variant/:id')
  @Permissions(
    { feature: 'ADD_PRODUCT', access: 'READ', user_type: 'OEM' }, // dynamic user_type check
  )
  async deleteVariant(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.productService.deleteVariant(id);
    return ApiResponse.success('Product variant deleted successfully', deleted);
  }

}
