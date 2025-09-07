import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const [paramKey] = Object.keys(req.params); // Витягуємо ключ, наприклад 'productId' або 'orderId'
  const id = req.params[paramKey];

  if (!isValidObjectId(id)) {
    return next(createHttpError(404, `${id} not valid id`));
  }

  next();
};
