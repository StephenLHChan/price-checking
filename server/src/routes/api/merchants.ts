import express from 'express';
import * as Joi from 'joi';
import { Merchant } from '../../database/models';

const router = express.Router();

// Validation middleware
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

const checkMerchantExist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  const merchant = await Merchant.findByPk(id);
  if (!merchant) {
    return res.status(404).json({ error: 'Merchant not found' });
  }
  (req as any).merchant = merchant;
  next()
};

// To get all merchants
router.get('/', async (req: express.Request, res: express.Response) => {
    const merchants = await Merchant.findAll();
    res.json(merchants);
});

router.get('/:id',checkMerchantExist, async (req: express.Request, res: express.Response) => {
  const merchant = (req as any).merchant;
  res.json(merchant);
});

// To create a new merchant
router.post('/', validateMerchant, async (req: express.Request, res: express.Response) => {
    const { name } = req.body;
    // Check if merchant name is already in use
    const existingMerchant = await Merchant.findOne({ where: { name } });
    if (existingMerchant) {
      res.status(400).json({ error: 'Merchant name already in use' });
      return;
    }
    // Create merchant
    const merchant = await Merchant.create({ name });
    res.status(201).json(merchant);
  });

// To update the merchant
router.patch('/:id', validateMerchant, checkMerchantExist, async (req: express.Request, res: express.Response) => {
    const merchant = (req as any).merchant;
    const { name } = req.body;
    await merchant.update({ name });
    res.json(merchant);
});


export default router;