import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { cartSchema } from '../validation/cart.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addProductsToCartController, getCartByIdController } from '../controllers/cart.js';

const router = Router();

router.put('/update', authenticate, validateBody(cartSchema), ctrlWrapper(addProductsToCartController));
router.get('/', authenticate, ctrlWrapper(getCartByIdController));

export default router;
