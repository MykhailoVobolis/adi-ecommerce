import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

// Схема для елемента в кошику
const favoriteProductSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true, enum: ['MEN', 'WOMEN', 'CHILDREN'] },
    price: { type: Number, required: true },
    color: { type: String, required: true },
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

// Схема для клекції улюблених товарів
const favoritesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    products: [favoriteProductSchema], // Масив товарів у кошику
  },
  { versionKey: false, timestamps: true },
);

// Використання Mongoose хук mongooseSaveError при додаванні("save") об'єкта що не відповідає схемі валідації
favoritesSchema.post('save', mongooseSaveError);

// Використання Mongoose хук setUpdateSettings перед ("pre") оновленням об'екта
favoritesSchema.pre('findOneAndUpdate', setUpdateSettings);

// Використання Mongoose хук mongooseSaveError при оновленні "findOneAndUpdate" об'єкта що не відповідає схемі валідації
favoritesSchema.post('findOneAndUpdate', mongooseSaveError);

export const FavoritesCollection = model('favorites', favoritesSchema);
