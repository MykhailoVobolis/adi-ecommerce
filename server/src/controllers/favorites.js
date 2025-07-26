import { addFavoriteProducts, deleteProductFromFavorites, getFavoriteProductsById } from '../services/favorites.js';
import { transformCartData } from '../utils/transformCartData.js';

export const addFavoriteProductsController = async (req, res) => {
  const userId = req.user._id; // Або req.user.id, залежно від схеми
  const products = req.body.products;

  const favoriteProducts = await addFavoriteProducts(userId, products);

  const data = transformCartData(favoriteProducts);

  res.status(201).json({
    status: 201,
    message: 'Products successfully added to favorites collection!',
    data,
  });
};

export const getFavoriteProductsByIdController = async (req, res) => {
  const userId = req.user._id;

  const favoriteProducts = await getFavoriteProductsById(userId);

  const data = transformCartData(favoriteProducts);

  res.status(200).json({
    status: 200,
    message: `Successfully found user favorites collection!`,
    data,
  });
};

export const deleteProductFromFavoritesController = async (req, res) => {
  const userId = req.user._id;
  const product = req.body;

  const favoriteProducts = await deleteProductFromFavorites(userId, product);

  const data = transformCartData(favoriteProducts);

  res.status(201).json({
    status: 201,
    message: 'Products successfully deleted from favorites collection!',
    data,
  });
};
