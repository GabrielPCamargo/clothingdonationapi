import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const pointSchema = new Schema({
  name: String,
  description: String,
  coodinates: {
    lat: Number,
    lng: Number,
  },
  number: String,
  type: String,
});

export const Point = mongoose.model('Point', pointSchema);
