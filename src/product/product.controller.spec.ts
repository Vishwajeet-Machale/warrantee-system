import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    addCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
    createProduct: jest.fn(),
    getProductById: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    createVariant: jest.fn(),
    getVariantById: jest.fn(),
    updateVariant: jest.fn(),
    deleteVariant: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });


// Test case for Creating Product Category


  describe('createCategory', () => {
    it('should create category and return success response', async () => {
      const result = { id: 1, name: 'Category A' };
      mockProductService.addCategory.mockResolvedValue(result);

      const dto = { name: 'Category A', description: 'desc', parent_id: undefined };

      const response = await controller.createCategory(dto);

      expect(response).toEqual({
        success: true,
        message: 'Product category created successfully',
        data: result,
      });
    });
  });

  // Test case for Updating Product Category

  describe('updateCategory', () => {
    it('should update category and return success response', async () => {
      const id = 1;
      const dto = { name: 'Updated Category', description: 'updated', parent_id: undefined };
      const result = { id, name: 'Updated Category' };
      mockProductService.updateCategory.mockResolvedValue(result);

      const response = await controller.updateCategory(id, dto);

      expect(response).toEqual({
        success: true,
        message: 'Product category updated successfully',
        data: result,
      });
    });
  });

  // Test case for Deleting the Product Category

  describe('deleteCategory', () => {
    it('should delete category and return success response', async () => {
      const id = 1;
      const result = { id, name: 'Deleted Category' };
      mockProductService.deleteCategory.mockResolvedValue(result);

      const response = await controller.deleteCategory(id);

      expect(response).toEqual({
        success: true,
        message: 'Product category deleted successfully',
        data: result,
      });
    });
  });

  // Test case for creating Product

  describe('createProduct', () => {
    it('should create product and return success response', async () => {
      const dto = {
        oem_account_id: 'uuid',
        name: 'Product A',
        model_no: 'M123',
        category_id: 1,
        specifications: 'Specs',
      };

      const result = {
        id: 1,
        name: 'Product A',
        model_no: 'M123',
        oem_account_id: 'uuid',
      };

      mockProductService.createProduct.mockResolvedValue(result);

      const response = await controller.createProduct(dto);

      expect(response).toEqual({
        success: true,
        message: 'Product created successfully',
        data: result,
      });
    });
  });

  // Test case for Get Product By Id

  describe('getProductById', () => {
    it('should return product data if found', async () => {
      const id = 1;
      const product = { id, name: 'Product A' };
      mockProductService.getProductById.mockResolvedValue(product);

      const response = await controller.getProductById(id);

      expect(response).toEqual({
        success: true,
        message: 'Product fetched successfully',
        data: product,
      });
    });
  });

  // Test case for updating Product

  describe('updateProduct', () => {
    it('should update product and return success response', async () => {
      const id = 1;
      const dto = { name: 'Updated Product', model_no: 'M456', category_id: 1 };
      const updated = { id, name: 'Updated Product', model_no: 'M456' };
      mockProductService.updateProduct.mockResolvedValue(updated);

      const response = await controller.updateProduct(id, dto);

      expect(response).toEqual({
        success: true,
        message: 'Product updated successfully',
        data: updated,
      });
    });
  });

  //Test case for Deleting the Product

  describe('deleteProduct', () => {
    it('should delete product and return success response', async () => {
      const id = 1;
      mockProductService.deleteProduct.mockResolvedValue(null);

      const response = await controller.deleteProduct(id);

      expect(response).toEqual({
        success: true,
        message: 'Product deleted successfully',
        data: null,
      });
    });
  });

  //Test case for creating the Product Variant

  describe('createVariant', () => {
    it('should create variant and return success response', async () => {
      const productId = 1;
      const dto = {
        sku_code: 'SKU123',
        model_no: 'M123',
        variant_name: 'Variant A',
        attributes_json: {},
        dealer_price: 100,
        MRP: 120,
        warranty_months: 12,
        amc_available: true,
        refundable: false,
        launch_date: '2023-01-01',
        bar_code: 'BAR123',
      };

      const result = { id: 1, sku_code: 'SKU123', variant_name: 'Variant A', warranty_months: 12 };
      mockProductService.createVariant.mockResolvedValue(result);

      const response = await controller.createVariant(productId, dto);

      expect(response).toEqual({
        success: true,
        message: 'Product variant created successfully',
        data: result,
      });
    });
  });

  //Test case for Get Product variant By Id

  describe('getVariantById', () => {
    it('should return variant data if found', async () => {
      const id = 1;
      const variant = { id, sku_code: 'SKU123' };
      mockProductService.getVariantById.mockResolvedValue(variant);

      const response = await controller.getVariantById(id);

      expect(response).toEqual({
        success: true,
        message: 'Product variant fetched successfully',
        data: variant,
      });
    });
  });

  // Test Case for Updating the Product Variant

  describe('updateVariant', () => {
    it('should update variant and return success response', async () => {
      const id = 1;
      const dto = { variant_name: 'Updated Variant' };
      const updated = { id, variant_name: 'Updated Variant' };
      mockProductService.updateVariant.mockResolvedValue(updated);

      const response = await controller.updateVariant(id, dto);

      expect(response).toEqual({
        success: true,
        message: 'Product variant updated successfully',
        data: updated,
      });
    });
  });

  //Test case for Deleting the Product Variant

  describe('deleteVariant', () => {
    it('should delete variant and return success response', async () => {
      const id = 1;
      const deleted = { id };
      mockProductService.deleteVariant.mockResolvedValue(deleted);

      const response = await controller.deleteVariant(id);

      expect(response).toEqual({
        success: true,
        message: 'Product variant deleted successfully',
        data: deleted,
      });
    });
  });
});
