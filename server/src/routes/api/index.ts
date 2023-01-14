import express from 'express';
import brandsRouter from './brands';
import merchantsRouter from './merchants'
import productsRouter from './products';
import productsCategoriesRouter from './productCategories'

const router = express.Router();

router.use('/brands', brandsRouter);
router.use('/merchants', merchantsRouter)
router.use('/products', productsRouter);
router.use('/products-categories', productsCategoriesRouter )

export default router;
