import { Router } from 'express';
import productsRouter from './products.js';

const router = Router();

router.use('/men', productsRouter);
router.use('/women', productsRouter);
router.use('/kids', productsRouter);

export default router;
