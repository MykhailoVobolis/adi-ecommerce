import { ProductsCollection } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// Сервіс-функція яка отримує всі продукти з бази данних за значенням сategory
export const getAllProductsByСategory = async ({ page = 1, perPage = 12, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find();

  if (filter.category) {
    productsQuery.where('category').regex(new RegExp(filter.category, 'i')).collation({ locale: 'en', strength: 2 }); // ігнорує регістр введеного значення
  }

  /* Використання Promise.all для поліпшення продуктивності */
  const [productsCount, products] = await Promise.all([
    ProductsCollection.find().merge(productsQuery).countDocuments(),
    productsQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: products,
    ...paginationData,
  };
};

// Сервіс-функція яка отримує один продукт з бази данних за його ID
export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);
  return product;
};
