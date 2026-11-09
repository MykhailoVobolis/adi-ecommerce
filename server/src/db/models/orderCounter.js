import { model, Schema } from 'mongoose';

const orderCounterSchema = new Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, required: true, default: 0 },
});

const OrderCounterCollection = model('orderCounters', orderCounterSchema);

export const getNextOrderNumber = async () => {
  let counter;

  try {
    counter = await OrderCounterCollection.findOneAndUpdate(
      { _id: 'orders' },
      { $inc: { sequence: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } catch (error) {
    // Concurrent first requests can race while creating the counter document.
    if (error.code !== 11000) throw error;

    counter = await OrderCounterCollection.findOneAndUpdate(
      { _id: 'orders' },
      { $inc: { sequence: 1 } },
      { new: true },
    );
  }

  return `ORD-${String(counter.sequence).padStart(6, '0')}`;
};
