import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { cartProductSchema, cartSchema } from '../validation/cart.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addProductsToCartController,
  changeProductQuantityController,
  deleteProductFromCartController,
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
router.delete(
  '/product-delete',
  authenticate,
  validateBody(cartProductSchema),
  ctrlWrapper(deleteProductFromCartController),
);

export default router;
