import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { taskId } = req.params;

  if (!isValidObjectId(taskId)) {
    return next(createHttpError(404, `${taskId} not valid id`));
  }

  next();
};
