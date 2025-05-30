import createHttpError from 'http-errors';
import { getAllProductsByTargetAudience, getProductById } from '../services/products.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

// Контроллер отримання колекції всіх продуктів за значенням targetAudience
export const getProductsController = async (req, res, _next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  // Отримуємо значення targetAudience з базового URL
  const path = req.baseUrl;
  const targetAudience = path.split('/')[1];

  const filter = {
    targetAudience,
  };

  const products = await getAllProductsByTargetAudience({
    page,
    perPage,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

// Контроллер отримання продукту за його id
export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;

  const product = await getProductById(productId);

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};
