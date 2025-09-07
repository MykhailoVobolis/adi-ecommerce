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
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

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
    const shortOrderId = newOrder._id.toString().slice(-10);

    const html = template({
      firstName,
      lastName,
      orderId: shortOrderId,
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
      subject: `Your order ID ${shortOrderId} successfully placed ✅`,
      html,
    });
  } catch (err) {
    console.error('Error sending email:', err.message);
  }

  // --- Fondy Checkout ---
  let checkoutUrl = null;

  if (orderDetails.paymentMethod === 'online_card') {
    const amountToPay = Math.round((orderDetails.totalPrice + orderDetails.delivery.cost) * 100); // в копійках

    const isProd = env('NODE_ENV') === 'production';

    const apiBaseUrl = isProd ? env('BASE_URL_PROD') : env('BASE_URL_DEV');

    // для callback беремо бекенд-URL
    const baseUrl = isProd ? env('BASE_URL_PROD') : env('BASE_URL_DEV_NGROK'); // під час розробки завжди запускай `ngrok http 3000`

    const fondyOrder = await fondy.Checkout({
      order_id: String(newOrder._id),
      order_desc: 'Test order',
      amount: amountToPay,
      currency: 'USD',
      response_url: `${apiBaseUrl}/order/fondy-response`, // звертаємось до api бекенду для реалізації редіректу на сторінку Pay Successful

      server_callback_url: `${baseUrl}/order/fondy-callback`, // цей URL викликає Fondy для підтвердження оплати
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

export const getOrdersByUserId = async ({ userId, page, perPage }) => {
  const skip = (page - 1) * perPage;

  const [orders, productsCount] = await Promise.all([
    OrderCollection.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(perPage),
    OrderCollection.countDocuments({ userId }),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: orders,
    ...paginationData,
  };
};
