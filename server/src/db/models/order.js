import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const orderProductSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true, enum: ['MEN', 'WOMEN', 'KIDS'] },
    type: { type: String, required: true, enum: ['SHOES', 'CLOTHING', 'ACCESSORIES'] },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    colorName: { type: String, required: true },
    image: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    contact: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    delivery: {
      method: { type: String, required: true },
      address: { type: String, required: true },
      cost: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    products: [orderProductSchema],
    totalQuantityProducts: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { versionKey: false, timestamps: true },
);

// Використання Mongoose хук mongooseSaveError при додаванні("save") об'єкта що не відповідає схемі валідації
orderSchema.post('save', mongooseSaveError);

// Використання Mongoose хук setUpdateSettings перед ("pre") оновленням об'екта
orderSchema.pre('findOneAndUpdate', setUpdateSettings);

// Використання Mongoose хук mongooseSaveError при оновленні "findOneAndUpdate" об'єкта що не відповідає схемі валідації
orderSchema.post('findOneAndUpdate', mongooseSaveError);

export const OrderCollection = model('orders', orderSchema);
