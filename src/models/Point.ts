import mongoose from 'mongoose';
import { Schema, isValidObjectId } from 'mongoose';

export interface PointType {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  user: {
    name: string;
    email: string;
    number: number;
  };
  type: string;
}

const pointSchema = new Schema<PointType>({
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

const PointModel = mongoose.model<PointType>('Point', pointSchema);

interface PointClass {
  create: () => Promise<PointType | undefined>;
  update: () => Promise<PointType | undefined>;
  delete: () => Promise<boolean>;
  validate: () => boolean;
}
export class Point implements PointClass {
  private data: PointType = {} as PointType;
  public errors: string[] = [];
  private readonly types: string[] = ['institution', 'request', 'donation'];
  constructor(private body: PointType) {}

  async create() {
    if (!this.validate()) return;

    try {
      const pointModel = new PointModel(this.body);
      await pointModel.save();
      this.data = pointModel;
      return pointModel;
    } catch (err) {
      this.errors.push('Error on create point model');
      console.log(err);
      return;
    }
  }

  static async getAll() {
    try {
      const points = await PointModel.find();
      return points;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  static async findOne(id: string) {
    if (!isValidObjectId(id)) return;

    try {
      const point = await PointModel.findById(id);
      return point;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async update() {
    if (!this.validate()) return;
    if (!isValidObjectId(this.body.id)) {
      this.errors.push('Id inválido');
      return;
    }

    try {
      await PointModel.updateOne({ id: this.body.id }, this.body);

      const updatedPoint = await PointModel.findById<PointType>(this.body.id);
      if (!updatedPoint) {
        this.errors.push('User not found');
        return;
      }

      return updatedPoint;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async delete() {
    if (!isValidObjectId(this.body.id)) {
      this.errors.push('Id inválido');
      return false;
    }

    try {
      const deletedPoint = await PointModel.deleteOne({ id: this.body.id });
      if (!(deletedPoint.deletedCount > 1)) {
        this.errors.push('Error deleting point');
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  validate() {
    if (!(Object.keys(this.body).length > 0)) {
      this.errors.push('Body is required');
      return false;
    }

    if (this.body.name.length < 4 || this.body.name.length > 255) {
      this.errors.push('Name must have between 4 and 255 characters');
    }

    if (
      this.body.description.length < 4 ||
      this.body.description.length > 255
    ) {
      this.errors.push('Description must have between 4 and 255 characters');
    }

    if (!(Object.keys(this.body.coordinates).length >= 2)) {
      this.errors.push('Coordinates is required');
    }

    if (!(Object.keys(this.body.user).length >= 3)) {
      this.errors.push('User is required');
    }

    if (!this.types.includes(this.body.type.toLowerCase())) {
      this.errors.push('Type must be institution, request or donation');
    }

    if (this.errors.length > 0) return false;

    return true;
  }
}
