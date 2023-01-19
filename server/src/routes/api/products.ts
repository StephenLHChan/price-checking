import express from 'express';

import { Product } from '../../database/models';
import { validate, productSchema } from '../middleware/validation';

const router = express.Router();



// To get all products
router.get('/', async (req: express.Request, res: express.Response) => {
    const products = await Product.findAll();
    res.json(products);
});

// To create a new product
router.post('/', validate(productSchema), async (req: express.Request, res: express.Response) => {
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
router.patch('/:id', validate(productSchema), async (req: express.Request, res: express.Response) => {
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