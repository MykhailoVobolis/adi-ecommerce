import createHttpError from 'http-errors';
import { createOrder, getOrderById } from '../services/order.js';
import { OrderCollection } from '../db/models/order.js';

export const createOrderController = async (req, res) => {
  const userId = req.user?._id || null; // userId витягується через middleware authenticate
  const orderDetails = req.body; // Дані про замовлення передаються в body

  const order = await createOrder(userId, orderDetails);

  res.status(201).json({
    status: 200,
    message: 'Order successfully created',
    data: order,
  });
};

export const fondyCallbackController = async (req, res) => {
  const data = req.fondyData;
  const { order_id, order_status } = data;

  const order = await OrderCollection.findById(order_id);
  if (!order) return res.status(404).send('Order not found');

  if (order_status === 'approved') {
    order.status = 'paid';
  } else {
    order.status = 'failed';
  }

  await order.save();

  res.status(200).send('OK');
};

export const fondyResponseController = async (req, res, next) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).send('Missing order_id');
  }

  // Редирект на фронт с GET
  return res.redirect(302, `http://localhost:5173/order-confirmation/${order_id}`);
};

export const getOrderByIdController = async (req, res, next) => {
  const { orderId } = req.params;

  const order = await getOrderById(orderId);

  if (!order) {
    next(createHttpError(404, 'Order not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found order with id ${orderId}!`,
    data: order,
  });
};
