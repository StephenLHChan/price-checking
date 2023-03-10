import express from 'express';

import { Brand } from '../../database/models';
import { validate, brandSchema } from '../middleware/validation';

const router = express.Router();

const checkBrandExist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  const brand = await Brand.findByPk(id);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  (req as any).brand = brand;
  next();
};

// To get all brands
router.get('/', async (req: express.Request, res: express.Response) => {
  const brands = await Brand.findAll();
  res.json(brands);
});

// To get a brand by id
router.get('/:id', checkBrandExist, async (req: express.Request, res: express.Response) => {
  const brand = (req as any).brand;
  res.json(brand);
});

// To create a new brand
router.post('/', validate(brandSchema), async (req: express.Request, res: express.Response) => {
  const { name, descriptions, website, logo } = req.body;
  // Check if brand name is already in use
  const existingBrand = await Brand.findOne({ where: { name } });
  if (existingBrand) {
    return res.status(400).json({ error: 'Brand name already in use' });
  }
  // Create brand
  const brand = await Brand.create({ name, descriptions, website, logo });
  return res.status(201).json(brand);
});

// To update the brand
router.patch('/:id', validate(brandSchema), checkBrandExist, async (req: express.Request, res: express.Response) => {
  const brand = (req as any).brand;
  const { name, descriptions, website, logo } = req.body;
  const existingBrand = await Brand.findOne({ where: { name } });
  if (existingBrand) {
    return res.status(400).json({ error: 'Brand name already in use' });
  }

  await brand.update({ name, descriptions, website, logo });
  res.json(brand);
});

export default router;
