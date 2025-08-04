import { ProductsCollection } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// Сервіс-функція яка отримує всі продукти з бази данних за значенням сategory
export const getAllProductsByСategory = async ({ page, perPage, filter = {} }) => {
  const limit = perPage;

  const productsQuery = ProductsCollection.find();

  if (filter.category) {
    productsQuery.where('category').regex(new RegExp(filter.category, 'i')).collation({ locale: 'en', strength: 2 }); // ігнорує регістр введеного значення
  }

  const products = await productsQuery.exec();

  const normalizedProducts = [];

  const variantGroups = products.map((product) => {
    const { images, ...base } = product.toObject();

    // створюємо масив variantGroups, де кожен продукт має масив своїх варіантів.
    const variantsArray = Object.entries(images.variants).map(([key, variant]) => ({
      ...base,
      variantKey: key.trim(),
      color: variant.color.trim(),
      images: variant.images,
      previewImage: variant.images[0]?.src,
      countColors: Object.keys(images.variants).length,
    }));
    return variantsArray;
  });

  // обчислюємо найбільшу кількість варіантів серед усіх продуктів.
  const maxVariants = Math.max(...variantGroups.map((group) => group.length));

  // двома циклами: спочатку по індексу, потім по кожному продукту додаємо відповідний variant[i], якщо він існує
  for (let i = 0; i < maxVariants; i++) {
    for (const group of variantGroups) {
      if (group[i]) {
        normalizedProducts.push(group[i]);
      }
    }
  }

  const productsCount = normalizedProducts.length;
  const paginated = normalizedProducts.slice((page - 1) * limit, page * limit);
  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: paginated,
    ...paginationData,
  };
};

// Сервіс-функція яка отримує один продукт з бази данних за його ID
export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);
  return product;
};
