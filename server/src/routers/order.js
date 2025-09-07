import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { orderSchema } from '../validation/order.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createOrderController,
  fondyCallbackController,
  fondyResponseController,
  getOrderByIdController,
  getOrdersByUserIdController,
} from '../controllers/order.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateFondySignature } from '../middlewares/validateFondySignature.js';

const router = Router();

router.post('/create', authenticate, validateBody(orderSchema), ctrlWrapper(createOrderController));
router.get('/my-orders', authenticate, ctrlWrapper(getOrdersByUserIdController));
router.get('/:orderId', isValidId, ctrlWrapper(getOrderByIdController));
router.post('/fondy-callback', validateFondySignature, ctrlWrapper(fondyCallbackController));
router.post('/fondy-response', ctrlWrapper(fondyResponseController));

export default router;
