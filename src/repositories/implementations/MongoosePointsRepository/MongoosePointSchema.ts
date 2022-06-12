import mongoose, { Schema } from 'mongoose';
import { IPoint } from '../../../entities/Point/IPoint';

const pointSchema = new Schema<IPoint>({
  name: String,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  user: {
    name: String,
    email: String,
    number: Number,
  },
  type: String,
});

export const PointModel = mongoose.model<IPoint>('Point', pointSchema);
