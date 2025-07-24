import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { cartProductSchema, cartSchema } from '../validation/cart.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addProductsToCartController,
  changeProductQuantityController,
  getCartByIdController,
} from '../controllers/cart.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getCartByIdController));
router.put('/update', authenticate, validateBody(cartSchema), ctrlWrapper(addProductsToCartController));
router.put(
  '/change-quantity',
  authenticate,
  validateBody(cartProductSchema),
  ctrlWrapper(changeProductQuantityController),
);

export default router;
