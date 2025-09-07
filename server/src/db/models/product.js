import { model, Schema } from 'mongoose';

const imageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false },
);

const variantSchema = new Schema(
  {
    color: { type: String, required: true },
    images: { type: [imageSchema], required: true },
  },
  { _id: false },
);

const descriptionSchema = new Schema(
  {
    main: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
    additional1: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
    additional2: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
  },
  { _id: false },
);

const imagesSchema = new Schema(
  {
    general: { type: [imageSchema], required: true },
    variants: {
      white: { type: variantSchema },
      blue: { type: variantSchema },
      green: { type: variantSchema },
    },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['MEN', 'WOMEN', 'KIDS'], required: true },
    type: { type: String, enum: ['SHOES', 'CLOTHING', 'ACCESSORIES'], required: true },
    sizes: { type: [String], required: true },
    description: { type: descriptionSchema, required: true },
    details: { type: String, required: true },
    images: { type: imagesSchema, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ProductsCollection = model('products', productSchema);
