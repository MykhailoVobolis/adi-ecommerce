import Joi from 'joi';

import { regex } from '../constants/user.js';

const { emailRegexp, phoneNumberRegexp } = regex;

const categoryEnum = ['MEN', 'WOMEN', 'KIDS'];
const typeEnum = ['SHOES', 'CLOTHING', 'ACCESSORIES'];
const deliveryMethodEnum = ['branch', 'postomat', 'courier'];
const paymentMethodEnum = ['online_card', 'on_delivery'];
const orderStatusEnum = ['pending', 'paid', 'failed', 'canceled'];

export const orderProductSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  category: Joi.string()
    .valid(...categoryEnum)
    .required(),
  color: Joi.string().required(),
  colorName: Joi.string().required(),
  image: Joi.object({
    src: Joi.string().uri().required(),
    alt: Joi.string().max(200).required(),
  }),
  price: Joi.number().min(0).precision(2).required(),
  productName: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  size: Joi.string().required(),
  type: Joi.string()
    .valid(...typeEnum)
    .required(),
}).messages({
  'string.base': 'The field {#label} must be a string.',
  'string.length': 'The field {#label} must be exactly 24 characters long.',
  'number.base': 'The field {#label} must be a number.',
  'number.min': 'The field {#label} cannot be less than {#limit}.',
  'number.integer': 'The field {#label} must be an integer.',
  'any.required': 'The field {#label} is required.',
});

const contactSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().pattern(phoneNumberRegexp).required(),
});

const deliverySchema = Joi.object({
  address: Joi.string().required(),
  cost: Joi.number().min(0).precision(2).required(),
  method: Joi.string()
    .valid(...deliveryMethodEnum)
    .required(),
});

export const orderSchema = Joi.object({
  contact: contactSchema.required(),
  delivery: deliverySchema.required(),
  paymentMethod: Joi.string()
    .valid(...paymentMethodEnum)
    .required(),
  products: Joi.array().items(orderProductSchema).min(1).required(),
  totalQuantityProducts: Joi.number().min(0).required(),
  totalPrice: Joi.number().min(0).precision(2).required(),
  status: Joi.string()
    .valid(...orderStatusEnum)
    .default('pending'),
}).messages({
  'string.base': 'The field {#label} must be a string.',
  'string.length': 'The field {#label} must be exactly 24 characters long.',
  'number.base': 'The field {#label} must be a number.',
  'number.min': 'The field {#label} cannot be less than {#limit}.',
  'number.integer': 'The field {#label} must be an integer.',
  'any.required': 'The field {#label} is required.',
  'array.min': 'The field {#label} must contain at least {#limit} items.',
});
