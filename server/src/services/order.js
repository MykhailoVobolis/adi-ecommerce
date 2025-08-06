import createHttpError from 'http-errors';

import { CartCollection } from '../db/models/cart.js';
import { OrderCollection } from '../db/models/order.js';

export const createOrder = async (userId, orderDetails) => {
  let newOrder;

  if (userId) {
    const cart = await CartCollection.findOne({ userId });

    if (!cart) {
      throw createHttpError(404, 'Cart not found');
    }

    if (cart.products.length === 0) {
      throw createHttpError(400, 'Cart is empty');
    }

    // Створити замовлення
    newOrder = await OrderCollection.create({
      userId,
      ...orderDetails,
      status: 'confirmed',
    });

    // Очистити кошик
    cart.products = [];
    cart.totalQuantityProducts = 0;
    cart.totalPrice = 0;
    await cart.save();
  } else {
    // Замовлення від неавторизованого користувача
    newOrder = await OrderCollection.create({
      ...orderDetails,
      status: 'confirmed',
    });
  }

  return {
    orderId: newOrder._id,
  };
};

export const getOrderById = async (orderId) => {
  const order = await OrderCollection.findById(orderId);
  return order;
};
