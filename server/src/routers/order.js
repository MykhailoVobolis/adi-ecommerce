import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { orderSchema } from '../validation/order.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createOrderController, getOrderByIdController } from '../controllers/order.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.post('/create', authenticate, validateBody(orderSchema), ctrlWrapper(createOrderController));
router.get('/:orderId', isValidId, ctrlWrapper(getOrderByIdController));

export default router;
