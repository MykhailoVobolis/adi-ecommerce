import createHttpError from 'http-errors';
import { getAllProductsByСategory, getProductById } from '../services/products.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

// Контроллер отримання колекції всіх продуктів за значенням сategory
export const getProductsController = async (req, res, _next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  // Отримуємо значення сategory з базового URL
  const path = req.baseUrl;
  const category = path.split('/')[2];

  const filter = {
    category,
  };

  const products = await getAllProductsByСategory({
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
