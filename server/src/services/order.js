import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { CartCollection } from '../db/models/cart.js';
import { OrderCollection } from '../db/models/order.js';
import { sendEmail } from '../utils/sendMail.js';
import { env } from '../utils/env.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';

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

  // Відправлення підтвердження замовлення на email
  try {
    const {
      contact: { firstName, lastName, email },
      products,
      totalPrice,
      delivery: { method, address, cost },
      paymentMethod,
    } = newOrder;

    // підготовка даних для шаблону
    const productsForTemplate = products.map((p) => ({
      productName: p.productName,
      size: p.size,
      colorName: p.colorName,
      quantity: p.quantity,
      price: p.price,
      total: p.price * p.quantity,
    }));

    const amountToPay = totalPrice + cost;

    // шлях до шаблону
    const templatePath = path.join(TEMPLATES_DIR, 'orderConfirmation.html');
    const templateSource = (await fs.readFile(templatePath)).toString();
    const template = handlebars.compile(templateSource);

    const html = template({
      firstName,
      lastName,
      orderId: newOrder._id,
      products: productsForTemplate,
      paymentMethod,
      deliveryMethod: method,
      deliveryAddress: address,
      deliveryCost: cost,
      amountToPay,
    });

    await sendEmail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: `Ваше замовлення №${newOrder._id} підтверджено`,
      html,
    });
  } catch (err) {
    console.error('Помилка надсилання email:', err.message);
  }

  return {
    orderId: newOrder._id,
  };
};

export const getOrderById = async (orderId) => {
  const order = await OrderCollection.findById(orderId);
  return order;
};
