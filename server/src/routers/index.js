import { Router } from 'express';
import productsRouter from './products.js';
import deliveryRouter from './delivery.js';
import authRouter from './auth.js';
import cartRouter from './cart.js';
import favoritesRouter from './favorites.js';

const router = Router();

router.use('/products/men', productsRouter);
router.use('/products/women', productsRouter);
router.use('/products/kids', productsRouter);
router.use('/products', productsRouter);
router.use('/delivery', deliveryRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/favorites', favoritesRouter);

export default router;
