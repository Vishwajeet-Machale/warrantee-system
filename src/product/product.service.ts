import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async addCategory(dto: CreateProductCategoryDto) {
    const { name, parent_id } = dto;

    // 1. Check for existing duplicate category with same name and parent
    const existing = await this.prisma.productCategory.findFirst({
      where: {
        name: name.trim(),
        parent_id: parent_id ?? null,
      },
    });

    if (existing) {
      throw new ConflictException(
        `Category "${name}" already exists under the same parent.`,
      );
    }

    // 2. Validate parent_id exists if provided
    if (parent_id) {
      const parentExists = await this.prisma.productCategory.findUnique({
        where: { id: parent_id },
      });

      if (!parentExists) {
        throw new BadRequestException(
          `Parent category with ID ${parent_id} does not exist.`,
        );
      }
    }

    // 3. Create category
    return this.prisma.productCategory.create({
      data: {
        name: name.trim(),
        description: dto.description?.trim() ?? null,
        parent_id: parent_id ?? null,
      },
    });
  }

  // Get all product categories
  async getAllCategories() {
    return this.prisma.productCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }

   

  async updateCategory(id: number, dto: UpdateProductCategoryDto) {
    const existing = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Category not found');

    return this.prisma.productCategory.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCategory(id: number) {
  const category = await this.prisma.productCategory.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      is_deleted: true,
    },
  });

  if (!category || category.is_deleted) {
    throw new NotFoundException('Category not found');
  }

  await this.prisma.productCategory.update({
    where: { id },
    data: { is_deleted: true },
  });

  return {
    id: category.id,
    name: category.name,
  };
}



  // ----- Product CRUD -----
  async createProduct(dto: CreateProductDto) {
    const { oem_account_id, name, model_no, category_id } = dto;

    // 1. Check if category exists
    const category = await this.prisma.productCategory.findUnique({
      where: { id: category_id },
    });
    if (!category) {
      throw new NotFoundException('Product category not found');
    }

    // 3. Prevent duplicate model number under same OEM
    const existingByModel = await this.prisma.product.findFirst({
      where: {
        oem_account_id,
        model_no: model_no,
      },
    });
    if (existingByModel) {
      throw new ConflictException(
        'Product with this model number already exists for this OEM',
      );
    }

    // 4. Create product
    const newProduct = await this.prisma.product.create({
      data: {
        oem_account_id,
        name,
        category_id,
        specifications: dto.specifications,
        model_no,
      },
    });

    return newProduct;
  }

  // Get all products with their category and variants (optional)
  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        variants: {
          where: { is_deleted: false }, // Only include non-deleted variants
        },
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        model_no: dto.model_no,
        category_id: dto.category_id,
        specifications: dto.specifications,
      },
    });
  }

  async deleteProduct(id: number) {
  const product = await this.prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      is_deleted: true,
    },
  });

  if (!product || product.is_deleted) {
    throw new NotFoundException('Product not found');
  }

  await this.prisma.product.update({
    where: { id },
    data: { is_deleted: true },
  });

  return {
    id: product.id,
    name: product.name,
  };
}



  // ----- ProductVariant CRUD -----
  async createVariant(productId: number, dto: CreateProductVariantDto) {
    // Check if the parent product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Parent product not found');
    }

    // Optional: Validate uniqueness of sku_code or model_no under same product
    const existingVariant = await this.prisma.productVariant.findFirst({
      where: {
        product_id: productId,
        OR: [{ sku_code: dto.sku_code }, { model_no: dto.model_no }],
      },
    });
    if (existingVariant) {
      throw new ConflictException(
        'Variant with this SKU code or model number already exists',
      );
    }

    const created = await this.prisma.productVariant.create({
      data: {
        ...dto,
        product_id: productId,
      },
    });

    return created;
  }

  // Get all product variants with parent product
 
  async getAllVariants() {
    return this.prisma.productVariant.findMany({
      include: {
        product: true,
      },
    });
  }

  async getVariantById(id: number) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException('Product variant not found');
    }
    return variant;
  }

  async updateVariant(id: number, dto: UpdateProductVariantDto) {
    const existing = await this.prisma.productVariant.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Product variant not found');
    }

    return this.prisma.productVariant.update({
      where: { id },
      data: dto,
    });
  }

  async deleteVariant(id: number) {
  const variant = await this.prisma.productVariant.findUnique({
    where: { id },
    select: {
      id: true,
      variant_name: true,
      is_deleted: true,
    },
  });

  if (!variant || variant.is_deleted) {
    throw new NotFoundException('Variant not found');
  }

  await this.prisma.productVariant.update({
    where: { id },
    data: { is_deleted: true },
  });

  return {
    id: variant.id,
    name: variant.variant_name,
  };
}

}
