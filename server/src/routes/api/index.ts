import express from 'express';
import brandsRouter from './brands';
import productsRouter from './products';

const router = express.Router();

router.use('/brands', brandsRouter);
router.use('/products', productsRouter);


export default router;
