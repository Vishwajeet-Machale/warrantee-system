import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAmcDto } from './dto/create-amc.dto';
import { UpdateAmcDto } from './dto/update-amc.dto';

@Injectable()
export class AmcService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAmcDto) {
    const { product_id, variant_id, category_ids, oem_account_id, ...rest } = dto;

    if (!product_id && !variant_id && (!category_ids || category_ids.length === 0)) {
      throw new BadRequestException(
        'At least one of product_id, variant_id, or category_ids must be provided.'
      );
    }


    const categoryConnect =
      category_ids && category_ids.length > 0
        ? {
            categories: {
              connect: category_ids.map((id) => ({ id })),
            },
          }
        : {};

    try {
      const amc = await this.prisma.amcPlan.create({
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
        message: 'AMC plan created successfully',
        data: amc,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to create AMC plan');
    }
  }

  async findAll() {
    try {
      const amcs = await this.prisma.amcPlan.findMany({
        include: {
          product: true,
          variant: true,
          categories: true,
          oemAccount: true,
        },
      });

      return {
        success: true,
        message: 'AMC plans fetched successfully.',
        data: amcs,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch AMC plans.');
    }
  }

  async findOne(id: number) {
    const amc = await this.prisma.amcPlan.findUnique({
      where: { id },
      include: {
        product: true,
        variant: true,
        categories: true,
        oemAccount: true,
      },
    });

    if (!amc) {
      throw new NotFoundException(`AMC plan with ID ${id} not found`);
    }

    return amc;
  }

  async update(id: number, dto: UpdateAmcDto) {
    await this.findOne(id); // Ensure it exists

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
        set: category_ids.map((id) => ({ id })),
      };
    }

    if (oem_account_id) {
      data.oemAccount = { connect: { id: oem_account_id } };
    }

    return this.prisma.amcPlan.update({
      where: { id },
      data,
      include: {
        product: true,
        variant: true,
        categories: true,
        oemAccount: true,
      },
    });
  }

  async delete(id: number) {
  // Ensure the AMC Plan exists before deleting
  await this.findOne(id);

  // Perform soft delete: set is_deleted = true
  return this.prisma.amcPlan.update({
    where: { id },
    data: { is_deleted: true },
    select: {
      id: true,
      plan_name: true,
    },
  });
}

}
