import { Router } from 'express';
import productsRouter from './products.js';

const router = Router();

router.use('/products/men', productsRouter);
router.use('/products/women', productsRouter);
router.use('/products/kids', productsRouter);
router.use('/products', productsRouter);

export default router;
