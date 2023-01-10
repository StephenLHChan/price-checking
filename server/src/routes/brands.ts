import express from 'express';
import { Brand } from '../database/models';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const brands = await Brand.findAll();
    res.json(brands);
});


  export default router;