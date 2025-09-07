import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { regex } from '../../constants/user.js';

const { emailRegexp, phoneNumberRegexp } = regex;

const usersSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, match: phoneNumberRegexp, unique: true, sparse: true },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

// Використання Mongoose хук mongooseSaveError при додаванні("save") об'єкта що не відповідає схемі валідації
usersSchema.post('save', mongooseSaveError);

// Використання Mongoose хук setUpdateSettings перед ("pre") оновленням об'екта
usersSchema.pre('findOneAndUpdate', setUpdateSettings);

// Використання Mongoose хук mongooseSaveError при оновленні "findOneAndUpdate" об'єкта що не відповідає схемі валідації
usersSchema.post('findOneAndUpdate', mongooseSaveError);

export const UsersCollection = model('users', usersSchema);
