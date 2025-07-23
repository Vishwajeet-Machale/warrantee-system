import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  // Mocked Prisma methods for different models
  const prismaMock = {
    productCategory: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    productVariant: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  // Initialize testing module and inject mocked Prisma service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks(); // Reset mock call history
  });

  // ---------- Category Tests ----------

  describe('addCategory', () => {
    it('should create a category successfully', async () => {
      prismaMock.productCategory.findFirst.mockResolvedValue(null); // no duplicate
      prismaMock.productCategory.findUnique.mockResolvedValue({ id: 1 }); // parent exists
      prismaMock.productCategory.create.mockResolvedValue({ id: 1, name: 'Test', parent_id: null });

      const dto = { name: 'Test', description: 'desc' };

      const result = await service.addCategory(dto);

      expect(result).toEqual({ id: 1, name: 'Test', parent_id: null });
      expect(prismaMock.productCategory.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ name: 'Test' }),
      }));
    });

    it('should throw ConflictException if duplicate category exists', async () => {
      prismaMock.productCategory.findFirst.mockResolvedValue({ id: 1 });

      await expect(service.addCategory({ name: 'Test', parent_id: undefined }))
        .rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException if parent category does not exist', async () => {
      prismaMock.productCategory.findFirst.mockResolvedValue(null);
      prismaMock.productCategory.findUnique.mockResolvedValue(null);

      await expect(service.addCategory({ name: 'Test', parent_id: 99 }))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('updateCategory', () => {
    it('should update category successfully', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue({ id: 1, name: 'Old Name' });
      prismaMock.productCategory.update.mockResolvedValue({ id: 1, name: 'New Name' });

      const dto = { name: 'New Name' };
      const result = await service.updateCategory(1, dto);

      expect(result).toEqual({ id: 1, name: 'New Name' });
      expect(prismaMock.productCategory.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue(null);

      await expect(service.updateCategory(1, { name: 'Test' }))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCategory', () => {
    it('should delete category successfully', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.productCategory.delete.mockResolvedValue({ id: 1 });

      const result = await service.deleteCategory(1);

      expect(result).toEqual({ id: 1 });
      expect(prismaMock.productCategory.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue(null);

      await expect(service.deleteCategory(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------- Product Tests ----------

  describe('createProduct', () => {
    it('should create product successfully', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.product.findFirst.mockResolvedValue(null); // no duplicate model_no
      prismaMock.product.create.mockResolvedValue({ id: 1, name: 'Product A', model_no: 'M123' });

      const dto = {
        oem_account_id: 'uuid-1',
        name: 'Product A',
        model_no: 'M123',
        category_id: 1,
        specifications: 'Specs',
      };

      const result = await service.createProduct(dto);

      expect(result).toEqual(expect.objectContaining({ name: 'Product A', model_no: 'M123' }));
      expect(prismaMock.product.create).toHaveBeenCalled();
    });

    it('should throw NotFoundException if category not found', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue(null);

      await expect(service.createProduct({
        oem_account_id: 'uuid-1',
        name: 'Product A',
        model_no: 'M123',
        category_id: 1,
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if model_no already exists', async () => {
      prismaMock.productCategory.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.product.findFirst.mockResolvedValue({ id: 2 });

      await expect(service.createProduct({
        oem_account_id: 'uuid-1',
        name: 'Product A',
        model_no: 'M123',
        category_id: 1,
      })).rejects.toThrow(ConflictException);
    });
  });

  describe('getProductById', () => {
    it('should return product when found', async () => {
      prismaMock.product.findUnique.mockResolvedValue({ id: 1, name: 'Product A' });

      const result = await service.getProductById(1);
      expect(result).toEqual({ id: 1, name: 'Product A' });
    });

    it('should throw NotFoundException if product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      await expect(service.getProductById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProduct', () => {
    it('should update product successfully', async () => {
      prismaMock.product.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.product.update.mockResolvedValue({ id: 1, name: 'Updated Product' });

      const dto = { name: 'Updated Product', model_no: 'M999', category_id: 2, specifications: 'Updated specs' };
      const result = await service.updateProduct(1, dto);

      expect(result).toEqual({ id: 1, name: 'Updated Product' });
      expect(prismaMock.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      await expect(service.updateProduct(1, { name: 'Test' } as any))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product successfully', async () => {
      prismaMock.product.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.product.delete.mockResolvedValue({ id: 1 });

      const result = await service.deleteProduct(1);

      expect(result).toEqual({ id: 1 });
      expect(prismaMock.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      await expect(service.deleteProduct(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------- Variant Tests ----------

  describe('createVariant', () => {
    it('should create product variant successfully', async () => {
      prismaMock.product.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.productVariant.findFirst.mockResolvedValue(null); // no duplicate sku/model_no
      prismaMock.productVariant.create.mockResolvedValue({ id: 1, sku_code: 'SKU123' });

      const dto = {
        sku_code: 'SKU123',
        model_no: 'M456',
        variant_name: 'Variant 1',
        attributes_json: { color: 'red' },
        dealer_price: 100,
        MRP: 120,
        warranty_months: 12,
        amc_available: true,
        refundable: false,
        launch_date: new Date().toISOString(),
        bar_code: 'BAR123',
        discontinued_date: undefined,
        image_url: undefined,
      };

      const result = await service.createVariant(1, dto);
      expect(result).toEqual({ id: 1, sku_code: 'SKU123' });
      expect(prismaMock.productVariant.create).toHaveBeenCalled();
    });

    it('should throw NotFoundException if parent product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      await expect(service.createVariant(1, {} as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if variant SKU or model_no already exists', async () => {
      prismaMock.product.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.productVariant.findFirst.mockResolvedValue({ id: 1 });

      await expect(service.createVariant(1, {
        sku_code: 'SKU123',
        model_no: 'M456',
      } as any)).rejects.toThrow(ConflictException);
    });
  });

  describe('getVariantById', () => {
    it('should return variant when found', async () => {
      prismaMock.productVariant.findUnique.mockResolvedValue({ id: 1, sku_code: 'SKU123' });

      const result = await service.getVariantById(1);
      expect(result).toEqual({ id: 1, sku_code: 'SKU123' });
    });

    it('should throw NotFoundException if variant not found', async () => {
      prismaMock.productVariant.findUnique.mockResolvedValue(null);

      await expect(service.getVariantById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateVariant', () => {
    it('should update variant successfully', async () => {
      prismaMock.productVariant.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.productVariant.update.mockResolvedValue({ id: 1, sku_code: 'SKU999' });

      const dto = { sku_code: 'SKU999' };
      const result = await service.updateVariant(1, dto);

      expect(result).toEqual({ id: 1, sku_code: 'SKU999' });
      expect(prismaMock.productVariant.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });

    it('should throw NotFoundException if variant not found', async () => {
      prismaMock.productVariant.findUnique.mockResolvedValue(null);

      await expect(service.updateVariant(1, { sku_code: 'Test' } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteVariant', () => {
    it('should delete variant successfully', async () => {
      prismaMock.productVariant.findUnique.mockResolvedValue({ id: 1 });
      prismaMock.productVariant.delete.mockResolvedValue({ id: 1 });

      const result = await service.deleteVariant(1);

      expect(result).toEqual({ id: 1 });
      expect(prismaMock.productVariant.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if variant not found', async () => {
      prismaMock.productVariant.findUnique.mockResolvedValue(null);

      await expect(service.deleteVariant(1)).rejects.toThrow(NotFoundException);
    });
  });

});
