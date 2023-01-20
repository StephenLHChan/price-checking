import express from 'express';
import * as Joi from 'joi';

const validate = (schema: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

const brandSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().allow('').optional(),
  website: Joi.string().uri().allow('').optional(),
  logo: Joi.string().allow('').optional(),
});

const merchantSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

const priceSchema = Joi.object({
  price: Joi.number().positive().required(),
  productId: Joi.number().integer().required(),
  merchantId: Joi.number().integer().required(),
});

const productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  subCategoryId: Joi.number().integer().required(),
  brandId: Joi.number().integer().required(),
});

const productCategorySchema = Joi.object({
  name: Joi.string().min(1).required(),
});

const productSubCategorySchema = Joi.object({
  name: Joi.string().min(1).required(),
  categoryId: Joi.number().integer().required(),
});

export {
  validate,
  brandSchema,
  merchantSchema,
  priceSchema,
  productSchema,
  productCategorySchema,
  productSubCategorySchema,
};
