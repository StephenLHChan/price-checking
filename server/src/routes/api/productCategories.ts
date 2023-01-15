import express from 'express';

import { ProductCategory } from '../../database/models';
import { validateProductCategory } from '../middleware/validation';

const router = express.Router();


// To get a full list of product category
router.get('/', async (req, res) => {
    const categories = await ProductCategory.findAll();
    res.json(categories);
  });

// To create a new product category
router.post('/', validateProductCategory, async (req, res) => {
  const newCategory = req.body;
  const createdCategory = await ProductCategory.create(newCategory);

  res.json(createdCategory);
});

// To update the name of the product category
router.patch('/:id', validateProductCategory, async (req, res) => {
    const { id } = req.params;
    const updatedCategory = req.body;
    const category = await ProductCategory.findByPk(id);
  
    if (category) {
      await category.update(updatedCategory);
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  });

export default router;
