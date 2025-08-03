import { FavoritesCollection } from '../db/models/favorites.js';
import { ProductsCollection } from '../db/models/product.js';

export const addFavoriteProducts = async (userId, products) => {
  let userFavorites = await FavoritesCollection.findOne({ userId });

  // Дістаємо з БД усі продукти по id
  const productIds = products.map((p) => p.productId);
  const dbProducts = await ProductsCollection.find({ _id: { $in: productIds } }).lean();

  // Формуємо масив продуктів для збереження у favorites.products
  const enrichedProducts = products
    .map((favoriteItem) => {
      const { productId, selectedColor } = favoriteItem;

      const currentProduct = dbProducts.find((p) => p._id.toString() === productId.toString());
      if (!currentProduct) return null;

      const colorVariant = currentProduct.images?.variants?.[selectedColor];
      if (!colorVariant) return null;

      return {
        productId: currentProduct._id,
        productName: currentProduct.productName,
        category: currentProduct.category,
        type: currentProduct.type,
        price: currentProduct.price,
        color: selectedColor,
        colorName: colorVariant.color || '',
        image: colorVariant.images?.[0] || '',
      };
    })
    .filter(Boolean); // видаляємо null

  if (!userFavorites) {
    // створюємо новий документ favorites
    userFavorites = new FavoritesCollection({
      userId,
      products: enrichedProducts,
    });
  } else {
    // додаємо нові товари, уникаючи дублікатів за productId + color
    for (const newProduct of enrichedProducts) {
      const exists = userFavorites.products.some(
        (p) => p.productId.toString() === newProduct.productId.toString() && p.color === newProduct.color,
      );

      if (!exists) {
        userFavorites.products.unshift(newProduct);
      }
    }
  }

  await userFavorites.save();

  // Повертаємо оновлений список улюблених товарів
  return await FavoritesCollection.findById(userFavorites._id);
};

export const getFavoriteProductsById = async (userId) => {
  const userFavorites = await FavoritesCollection.findOne({ userId });

  if (!userFavorites) {
    return {
      products: [],
    };
  }

  // Повертаємо оновлений кошик з підвантаженими продуктами
  const filteredFavoritesCollection = await FavoritesCollection.findById(userFavorites._id);

  return filteredFavoritesCollection;
};

export const deleteProductFromFavorites = async (userId, product) => {
  // Шукаємо кошик користувача за його унікальним ідентифікатором (userId)

  const userFavorites = await FavoritesCollection.findOne({ userId });

  const { productId, selectedColor } = product;

  // Фільтруємо продукти, щоб видалити потрібний
  const filteredProducts = userFavorites.products.filter(
    (p) => !(p.productId.toString() === productId.toString() && p.color === selectedColor),
  );

  // Оновлюємо продукти
  userFavorites.products = filteredProducts;

  await userFavorites.save();

  // Повертаємо оновлений кошик з підвантаженими продуктами
  const filteredFavoritesCollection = await FavoritesCollection.findById(userFavorites._id);

  return filteredFavoritesCollection;
};
