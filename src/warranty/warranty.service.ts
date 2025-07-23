import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';

@Injectable()
export class WarrantyService {
  constructor(private prisma: PrismaService) {}

async create(dto: CreateWarrantyDto) {
    const { product_id, variant_id, category_ids, oem_account_id, ...rest } = dto;

    // ✅ Validation: Require at least one identifier
    if (!product_id && !variant_id && (!category_ids || category_ids.length === 0)) {
      throw new BadRequestException(
        'At least one of product_id, variant_id, or category_ids must be provided.'
      );
    }

    // ✅ Prepare categories if category_ids provided
    const categoryConnect =
      category_ids && category_ids.length > 0
        ? {
            categories: {
              connect: category_ids.map((id: number) => ({ id })),
            },
          }
        : {};

    try {
      const createdWarranty = await this.prisma.warrantyPolicy.create({
        data: {
          ...rest,
          ...(product_id ? { product: { connect: { id: product_id } } } : {}),
          ...(variant_id ? { variant: { connect: { id: variant_id } } } : {}),
          ...categoryConnect,
          oemAccount: {
            connect: { id: oem_account_id },
          },
        },
        include: {
          product: true,
          variant: true,
          categories: true,
          oemAccount: true,
        },
      });

      return {
        success: true,
        message: 'Warranty policy created successfully',
        data: createdWarranty,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to create warranty policy'
      );
    }
  }


  async findAll() {
  try {
    const warranties = await this.prisma.warrantyPolicy.findMany({
      include: {
        // product: true,
        // variant: true,
        // categories: true,
        // oemAccount: true,
      }
    });

    return {
      success: true,
      message: 'Warranty policies fetched successfully.',
      data: warranties,
    };
  } catch (error) {
    throw new InternalServerErrorException('Failed to fetch warranty policies.');
  }
}


 async findOne(id: number) {
  const policy = await this.prisma.warrantyPolicy.findUnique({
    where: { id },
    include: {
      product: true,
      variant: true,
      categories: true,
      oemAccount: true,
    },
  });

  if (!policy) {
    throw new NotFoundException(`Warranty policy with ID ${id} not found`);
  }

  return policy;
}


 async update(id: number, dto: UpdateWarrantyDto) {
  const existingPolicy = await this.findOne(id); // Ensures the policy exists

  const { product_id, variant_id, category_ids, oem_account_id, ...rest } = dto;

  const data: any = {
    ...rest,
  };

  if (product_id) {
    data.product = { connect: { id: product_id } };
  }

  if (variant_id) {
    data.variant = { connect: { id: variant_id } };
  }

  if (category_ids && category_ids.length > 0) {
    data.categories = {
      set: category_ids.map((id) => ({ id })), // `set` replaces existing relations
    };
  }

  if (oem_account_id) {
    data.oemAccount = { connect: { id: oem_account_id } };
  }

  return this.prisma.warrantyPolicy.update({
    where: { id },
    data,
    include: {
      // product: true,
      // variant: true,
      // categories: true,
      // oemAccount: true,
    },
  });
}

async delete(id: number) {
  // Ensure the policy exists before deleting
  await this.findOne(id);

  // Soft delete: set is_deleted = true instead of hard delete
  return await this.prisma.warrantyPolicy.update({
    where: { id },
    data: { is_deleted: true },
    select: {
      id: true,
      policy_name: true,
    },
  });

 
}


}

