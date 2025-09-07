import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

// Схема для елемента в кошику
const cartProductSchema = new Schema(
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

// Схема для кошика
const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    products: [cartProductSchema], // Масив товарів у кошику
    totalQuantityProducts: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { versionKey: false, timestamps: true },
);

// Використання Mongoose хук mongooseSaveError при додаванні("save") об'єкта що не відповідає схемі валідації
cartSchema.post('save', mongooseSaveError);

// Використання Mongoose хук setUpdateSettings перед ("pre") оновленням об'екта
cartSchema.pre('findOneAndUpdate', setUpdateSettings);

// Використання Mongoose хук mongooseSaveError при оновленні "findOneAndUpdate" об'єкта що не відповідає схемі валідації
cartSchema.post('findOneAndUpdate', mongooseSaveError);

export const CartCollection = model('carts', cartSchema);
