import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addFavoriteProductsController,
  deleteProductFromFavoritesController,
  getFavoriteProductsByIdController,
} from '../controllers/favorites.js';
import { favoriteProductSchema, favoritesSchema } from '../validation/favorites.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getFavoriteProductsByIdController));
router.put('/add-favorite', authenticate, validateBody(favoritesSchema), ctrlWrapper(addFavoriteProductsController));
router.delete(
  '/remove-favorite',
  authenticate,
  validateBody(favoriteProductSchema),
  ctrlWrapper(deleteProductFromFavoritesController),
);

export default router;
