import { CartCollection } from '../db/models/cart.js';
import { ProductsCollection } from '../db/models/product.js';

export const addProductsToCart = async (userId, products) => {
  // Шукаємо кошик користувача за його унікальним ідентифікатором (userId)
  const cart = await CartCollection.findOne({ userId });

  // Якщо кошик для користувача не існує, створюємо новий кошик
  if (!cart) {
    const newCart = new CartCollection({ userId, products: [] });

    // Дістаємо з БД усі продукти по id
    const productIds = products.map((p) => p.productId);
    const dbProducts = await ProductsCollection.find({ _id: { $in: productIds } }).lean();

    let totalQuantity = 0;
    let totalPrice = 0;

    // Формуємо масив продуктів для збереження у cart.products
    const enrichedProducts = products
      .map((cartItem) => {
        const { productId, selectedColor, selectedSize, quantity } = cartItem;

        const curentProduct = dbProducts.find((p) => p._id.toString() === productId.toString());

        if (!curentProduct) return null;

        const colorName = curentProduct.images?.variants?.[selectedColor].color || '';
        const image = curentProduct.images?.variants?.[selectedColor].images[0];

        const cartProduct = {
          productId: curentProduct._id,
          productName: curentProduct.productName,
          category: curentProduct.category,
          price: curentProduct.price,
          color: selectedColor,
          size: selectedSize,
          quantity,
          colorName,
          image,
        };

        totalPrice += curentProduct.price * quantity;
        totalQuantity += quantity;

        return cartProduct;
      })
      .filter(Boolean); // Видаляємо null, якщо якийсь продукт не знайдено

    newCart.products = enrichedProducts;
    newCart.totalPrice = totalPrice.toFixed(2);
    newCart.totalQuantityProducts = totalQuantity;

    await newCart.save();

    // Підтягуємо дані про всі продукти з колекції ProductsCollection
    const populatedCart = await CartCollection.findById(newCart._id).populate(
      'products.productId', // Динамічно витягуємо дані про продукт
      'photo name category price', // Обираємо лише потрібні поля
    );

    return populatedCart;
  }

  // Якщо кошик існує, оновлюємо список продуктів
  const productIds = products.map((p) => p.productId);
  const dbProducts = await ProductsCollection.find({ _id: { $in: productIds } }).lean();

  for (const cartItem of products) {
    const { productId, selectedColor, selectedSize, quantity } = cartItem;

    const curentProduct = dbProducts.find((p) => p._id.toString() === productId.toString());
    if (!curentProduct) continue;

    const colorName = curentProduct.images?.variants?.[selectedColor]?.color || '';
    const image = curentProduct.images?.variants?.[selectedColor]?.images?.[0] || '';

    // Перевіряємо чи вже є такий товар (по id, кольору і розміру)
    const existingItem = cart.products.find(
      (p) => p.productId.toString() === productId.toString() && p.color === selectedColor && p.size === selectedSize,
    );

    // Якщо товар уже є — оновлюємо кількість
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Якщо товару ще нема — додаємо
      cart.products.push({
        productId: curentProduct._id,
        productName: curentProduct.productName,
        category: curentProduct.category,
        price: curentProduct.price,
        color: selectedColor,
        size: selectedSize,
        quantity,
        colorName,
        image,
      });
    }
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of cart.products) {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  }

  // Оновлюємо загальну кількість і суму
  cart.totalQuantityProducts = totalQuantity;
  cart.totalPrice = totalPrice.toFixed(2);

  await cart.save();

  // Повертаємо оновлений кошик з підвантаженими продуктами
  const updatedCart = await CartCollection.findById(cart._id).populate(
    'products.productId',
    'photo name category price',
  );

  return updatedCart;
};

export const getCartById = async (userId) => {
  const cart = await CartCollection.findOne({ userId });

  if (!cart) {
    return {
      products: [],
      totalPrice: 0,
      totalQuantityProducts: 0,
    };
  }

  const populatedCart = await CartCollection.findById(cart._id).populate(
    'products.productId',
    'photo name category price',
  );

  return populatedCart;
};

export const changeProductQuantity = async (userId, product) => {
  // Шукаємо кошик користувача за його унікальним ідентифікатором (userId)
  const cart = await CartCollection.findOne({ userId });

  const { productId, selectedColor, selectedSize, quantity } = product;

  // Перевіряємо чи вже є такий товар (по id, кольору і розміру)
  const existingItem = cart.products.find(
    (p) => p.productId.toString() === productId.toString() && p.color === selectedColor && p.size === selectedSize,
  );

  // Якщо товар є — оновлюємо кількість
  if (existingItem) {
    // Якщо кількість нового товару не дорівнює існуючій, оновлюємо кількість
    if (quantity !== existingItem.quantity) {
      existingItem.quantity = quantity;
    } else {
      return; // Нічого не змінюємо, якщо кількість однакова
    }
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of cart.products) {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  }

  // Оновлюємо загальну кількість і суму
  cart.totalQuantityProducts = totalQuantity;
  cart.totalPrice = totalPrice.toFixed(2);

  await cart.save();

  // Повертаємо оновлений кошик з підвантаженими продуктами
  const updatedCart = await CartCollection.findById(cart._id).populate(
    'products.productId',
    'photo name category price',
  );

  return updatedCart;
};

export const deleteProductFromCart = async (userId, product) => {
  // Шукаємо кошик користувача за його унікальним ідентифікатором (userId)
  const cart = await CartCollection.findOne({ userId });

  const { productId, selectedColor, selectedSize } = product;

  // Фільтруємо продукти, щоб видалити потрібний
  const filteredProducts = cart.products.filter(
    (p) => !(p.productId.toString() === productId.toString() && p.color === selectedColor && p.size === selectedSize),
  );

  // Оновлюємо продукти
  cart.products = filteredProducts;

  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of cart.products) {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  }

  // Оновлюємо загальну кількість і суму
  cart.totalQuantityProducts = totalQuantity;
  cart.totalPrice = totalPrice.toFixed(2);

  await cart.save();

  // Повертаємо оновлений кошик з підвантаженими продуктами
  const filteredCart = await CartCollection.findById(cart._id).populate(
    'products.productId',
    'photo name category price',
  );

  return filteredCart;
};
