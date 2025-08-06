import createHttpError from 'http-errors';
import { createOrder, getOrderById } from '../services/order.js';

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
