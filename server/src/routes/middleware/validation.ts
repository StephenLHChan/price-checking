import express from 'express';
import * as Joi from 'joi';


const validate = (schema: any, req: express.Request, res: express.Response) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
    return false;
  }
  return true;
}


const validateBrand = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });
    if (validate(schema, req, res)) {
      next();
   }
  };

const validateMerchant = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });
    if (validate(schema, req, res)) {
      next();
   }
  };

  const validatePrice = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      price: Joi.number().positive().required(),
      productId: Joi.number().integer().required(),
      merchantId: Joi.number().integer().required()
    });
    if (validate(schema, req, res)) {
      next();
   }
  };

  const validateProduct = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      subCategoryId: Joi.number().required(),
      brandId: Joi.number().required()
    });
    if (validate(schema, req, res)) {
      next();
   }
  };

  const validateProductCategory = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });
    if (validate(schema, req, res)) {
      next();
   }
  };

  const validateProductSubCategory = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      categoryId: Joi.number().integer().required(),
    });
    if (validate(schema, req, res)) {
      next();
   }
  };

export {validateBrand, validateMerchant, validatePrice, validateProduct, validateProductCategory, validateProductSubCategory};