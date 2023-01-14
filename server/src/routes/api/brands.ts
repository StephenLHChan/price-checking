import express from 'express';
import { Brand } from '../../database/models';
import * as Joi from 'joi';

const router = express.Router();

// Validation middleware
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

const checkBrandExist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  const brand = await Brand.findByPk(id);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  (req as any).brand = brand;
  next()
};

// To get all brands
router.get('/', async (req: express.Request, res: express.Response) => {
    const brands = await Brand.findAll();
    res.json(brands);
});

// To get a brand by id
router.get('/:id',checkBrandExist, async (req: express.Request, res: express.Response) => {
  const brand = (req as any).brand;
  res.json(brand);
});

// To create a new brand
router.post('/', validateBrand, async (req: express.Request, res: express.Response) => {
    const { name } = req.body;
    // Check if brand name is already in use
    const existingBrand = await Brand.findOne({ where: { name } });
    if (existingBrand) {
      res.status(400).json({ error: 'Brand name already in use' });
      return;
    }
    // Create brand
    const brand = await Brand.create({ name });
    res.status(201).json(brand);
  });

// To update the brand
router.patch('/:id', validateBrand, checkBrandExist, async (req: express.Request, res: express.Response) => {
  const brand = (req as any).brand;
  const { name } = req.body;
  await brand.update({ name });
  res.json(brand);
});


export default router;