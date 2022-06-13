import mongoose, { Schema } from 'mongoose';
import { IPoint } from '../../../entities/Point/IPoint';

const pointSchema = new Schema<IPoint>({
  _id: String,
  name: String,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  user: {
    name: String,
    email: String,
  },
  type: String,
  number: String,
});

export const PointModel = mongoose.model<IPoint>('Point', pointSchema);
