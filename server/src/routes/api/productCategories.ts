import express from 'express';
import * as Joi from 'joi';
import { ProductCategory } from '../../database/models';

const router = express.Router();

// Validation middleware
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
