import request from 'supertest';
import app from '../../../src/server';

import {
  validate,
  brandSchema,
  merchantSchema,
  priceSchema,
  productSchema,
  productCategorySchema,
  productSubCategorySchema,
} from '../../../src/routes/middleware/validation';

describe('brandSchema', () => {
  it('should return error if name is not provided', () => {
    const { error } = brandSchema.validate({ name: '' });
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is not allowed to be empty');
  });

  //   it('should return error if name is less than 1 character', () => {
  //     const { error } = brandSchema.validate({ name: 'a' });
  //     expect(error).toBeDefined();
  //     expect(error!.message).toBe('"name" length must be at least 1 characters long');
  //   });

  it('should return no error if name is provided', () => {
    const { error } = brandSchema.validate({ name: 'testBrand' });
    expect(error).toBe(undefined);
  });

  it('should return no error if description is not provided', () => {
    const { error } = brandSchema.validate({ name: 'testBrand', description: '' });
    expect(error).toBe(undefined);
  });

  it('should return no error if website is not provided', () => {
    const { error } = brandSchema.validate({ name: 'testBrand', website: '' });
    expect(error).toBe(undefined);
  });

  it('should return no error if logo is not provided', () => {
    const { error } = brandSchema.validate({ name: 'testBrand', logo: '' });
    expect(error).toBe(undefined);
  });

  it('should return error if website is not a valid url', () => {
    const { error } = brandSchema.validate({ name: 'testBrand', website: 'invalid-website' });
    expect(error!.message).toBe('"website" must be a valid uri');
  });
});

describe('merchantSchema', () => {
  it('should validate a valid merchant', () => {
    const { error } = merchantSchema.validate({ name: 'Test merchant' });
    expect(error).toBe(undefined);
  });

  it('should invalidate a merchant with no name', () => {
    const { error } = merchantSchema.validate({});
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is required');
  });

  it('should invalidate a merchant with a name shorter than 1 character', () => {
    const { error } = merchantSchema.validate({ name: '' });
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is not allowed to be empty');
  });
});

describe('priceSchema', () => {
  it('should validate a valid price', () => {
    const validPrice = { price: 10.0, productId: 1, merchantId: 1 };
    const { error } = priceSchema.validate(validPrice);
    expect(error).toBe(undefined);
  });

  it('should invalidate a price with no price', () => {
    const invalidPrice = { productId: 1, merchantId: 1 };
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"price" is required');
  });

  it('should invalidate a price with a negative price', () => {
    const invalidPrice = { price: -10.0, productId: 1, merchantId: 1 };
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"price" must be a positive number');
  });

  it('should invalidate a price with no productId', () => {
    const invalidPrice = { price: 10.0, merchantId: 1 };
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"productId" is required');
  });

  it('should invalidate a price with no merchantId', () => {
    const invalidPrice = { price: 10.0, productId: 1 };
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"merchantId" is required');
  });

  it('should invalidate a price with a non-integer productId', () => {
    const invalidPrice = { price: 10.0, productId: 1.5, merchantId: 1 };
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"productId" must be an integer');
  });

  it('should invalidate a price with a non-integer merchantId', () => {
    const invalidPrice = { price: 10.0, productId: 1, merchantId: 1.5 };
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"merchantId" must be an integer');
  });

  it('should invalidate a price with no price, productId, and merchantId', () => {
    const invalidPrice = {};
    const { error } = priceSchema.validate(invalidPrice);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"price" is required');
  });
});

describe('productSchema', () => {
  it('should validate a valid product', () => {
    const validProduct = { name: 'Product 1', subCategoryId: 1, brandId: 1 };
    const { error } = productSchema.validate(validProduct);
    expect(error).toBe(undefined);
  });

  it('should invalidate a product with no name', () => {
    const invalidProduct = { subCategoryId: 1, brandId: 1 };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is required');
  });

  it('should invalidate a product with a short name', () => {
    const invalidProduct = { name: '', subCategoryId: 1, brandId: 1 };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is not allowed to be empty');
  });

  it('should invalidate a product with no subCategoryId', () => {
    const invalidProduct = { name: 'Product 1', brandId: 1 };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"subCategoryId" is required');
  });

  it('should invalidate a product with no brandId', () => {
    const invalidProduct = { name: 'Product 1', subCategoryId: 1 };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"brandId" is required');
  });

  it('should invalidate a product with a non-integer subCategoryId', () => {
    const invalidProduct = { name: 'Product 1', subCategoryId: 1.5, brandId: 1 };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"subCategoryId" must be an integer');
  });

  it('should invalidate a product with a non-integer brandId', () => {
    const invalidProduct = { name: 'Product 1', subCategoryId: 1, brandId: 1.5 };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"brandId" must be an integer');
  });

  it('should invalidate a product with no subCategoryId and brandId', () => {
    const invalidProduct = { name: 'Product 1' };
    const { error } = productSchema.validate(invalidProduct);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"subCategoryId" is required');
  });
});

describe('productCategorySchema', () => {
  it('should validate a valid product category', () => {
    const validProductCategory = { name: 'Category 1' };
    const { error } = productCategorySchema.validate(validProductCategory);
    expect(error).toBe(undefined);
  });

  it('should invalidate a product category with no name', () => {
    const invalidProductCategory = {};
    const { error } = productCategorySchema.validate(invalidProductCategory);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is required');
  });

  it('should invalidate a product category with a short name', () => {
    const invalidProductCategory = { name: '' };
    const { error } = productCategorySchema.validate(invalidProductCategory);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is not allowed to be empty');
  });
});

describe('productSubCategorySchema', () => {
  it('should validate a valid product subcategory', () => {
    const validProductSubCategory = { name: 'Subcategory 1', categoryId: 1 };
    const { error } = productSubCategorySchema.validate(validProductSubCategory);
    expect(error).toBe(undefined);
  });

  it('should invalidate a product subcategory with no name', () => {
    const invalidProductSubCategory = { categoryId: 1 };
    const { error } = productSubCategorySchema.validate(invalidProductSubCategory);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is required');
  });

  it('should invalidate a product subcategory with no categoryId', () => {
    const invalidProductSubCategory = { name: 'Subcategory 1' };
    const { error } = productSubCategorySchema.validate(invalidProductSubCategory);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"categoryId" is required');
  });

  it('should invalidate a product subcategory with a short name', () => {
    const invalidProductSubCategory = { name: '', categoryId: 1 };
    const { error } = productSubCategorySchema.validate(invalidProductSubCategory);
    expect(error).toBeDefined();
    expect(error!.message).toBe('"name" is not allowed to be empty');
  });
});
