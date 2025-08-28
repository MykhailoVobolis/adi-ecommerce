import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { CartCollection } from '../db/models/cart.js';
import { OrderCollection } from '../db/models/order.js';
import { sendEmail } from '../utils/sendMail.js';
import { env } from '../utils/env.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { fondy } from '../utils/fondy.js';

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
      subject: `Your order ID ${newOrder._id} successfully placed ✅`,
      html,
    });
  } catch (err) {
    console.error('Error sending email:', err.message);
  }

  // --- Fondy Checkout ---
  let checkoutUrl = null;

  if (orderDetails.paymentMethod === 'online_card') {
    const amountToPay = (orderDetails.totalPrice + orderDetails.delivery.cost) * 100; // в копійках
    const fondyOrder = await fondy.Checkout({
      order_id: String(newOrder._id),
      order_desc: 'Test order',
      amount: amountToPay,
      currency: 'USD',
      response_url: 'http://localhost:3000/order/fondy-response', // звертаємось до api бекенду для реалізації редіректу на сторінку Pay Successful
      server_callback_url: 'http://localhost:3000/order/fondy-callback', // бекенд (в продакшені localhost:3000 змінюємо на URL хостінгу бекенда, при розробці замінюємо на тимчасовий URL від ngrok /команда ngrok http 3000/ Приклад: https://f2f295c4f399.ngrok-free.app/order/fondy-callback)
    });

    checkoutUrl = fondyOrder.checkout_url;
  }

  return {
    orderId: newOrder._id,
    checkoutUrl,
  };
};

export const getOrderById = async (orderId) => {
  const order = await OrderCollection.findById(orderId);
  return order;
};
