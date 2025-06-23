import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCitiesController, getWarehousesOfCityController } from '../controllers/delivery.js';

const router = Router();

router.get('/', ctrlWrapper(getCitiesController));
router.get('/warehouses', ctrlWrapper(getWarehousesOfCityController));

export default router;
