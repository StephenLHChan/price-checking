import express from 'express';
import * as Joi from 'joi';

const validateBrand = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };

const validateMerchant = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };

  const validatePrice = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      price: Joi.number().positive().required(),
      productId: Joi.number().integer().required(),
      merchantId: Joi.number().integer().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };

  const validateProduct = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      subCategoryId: Joi.number().required(),
      brandId: Joi.number().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };

  const validateProductCategory = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };

  const validateProductSubCategory = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      categoryId: Joi.number().integer().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };

export {validateBrand, validateMerchant, validatePrice, validateProduct, validateProductCategory, validateProductSubCategory};