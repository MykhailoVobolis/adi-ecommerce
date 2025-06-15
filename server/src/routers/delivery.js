import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCitiesController } from '../controllers/delivery.js';

const router = Router();

router.get('/', ctrlWrapper(getCitiesController));

export default router;
