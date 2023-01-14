import express from 'express';
import { Product } from '../../database/models';
import * as Joi from 'joi';

const router = express.Router();

// Validation middleware
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

// To get all products
router.get('/', async (req: express.Request, res: express.Response) => {
    const products = await Product.findAll();
    res.json(products);
});

// To create a new product
router.post('/', validateProduct, async (req: express.Request, res: express.Response) => {
    const { name } = req.body;
    // Check if product name is already in use
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      res.status(400).json({ error: 'Product name already in use' });
      return;
    }
    // Create product
    const product = await Product.create({ name });
    res.json(product);
  });

// To update the product
router.patch('/:id', validateProduct, async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
    const { name } = req.body;
    await product.update({ name });
    res.json(product);
});

  export default router;