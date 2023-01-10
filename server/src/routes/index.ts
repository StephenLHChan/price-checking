import express from 'express';
import brandsRouter from './brands';


const router = express.Router();

router.use('/brands', brandsRouter);

export default router;
