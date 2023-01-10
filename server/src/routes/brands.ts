import express from 'express';
import { Brand } from '../database/models';
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

// To get all brands
router.get('/', async (req: express.Request, res: express.Response) => {
    const brands = await Brand.findAll();
    res.json(brands);
});


  export default router;