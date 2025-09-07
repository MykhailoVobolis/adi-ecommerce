import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCitiesController,
  getDeliveryCostController,
  getDeliveryMethodsOfCityController,
  getStreetOfCityController,
  getWarehousesOfCityController,
} from '../controllers/delivery.js';

const router = Router();

router.get('/', ctrlWrapper(getCitiesController));
router.get('/methods', ctrlWrapper(getDeliveryMethodsOfCityController));
router.get('/warehouses', ctrlWrapper(getWarehousesOfCityController));
router.get('/cost', ctrlWrapper(getDeliveryCostController));
router.get('/streets', ctrlWrapper(getStreetOfCityController));

export default router;
