import mongoose from 'mongoose';
import { Schema, isValidObjectId } from 'mongoose';

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
}
