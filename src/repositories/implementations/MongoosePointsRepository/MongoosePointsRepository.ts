import mongoose from 'mongoose';
import { IPoint } from '../../../entities/Point/IPoint';
import { IPointsRepository } from '../../IPointsRepository';

export class MongoosePointsRepository implements IPointsRepository {
  constructor(private PointModel: mongoose.Model<IPoint>) {}
  async getAll(): Promise<IPoint[]> {
    const points = await this.PointModel.find();
    return points;
  }

  async create(point: IPoint): Promise<IPoint> {
    const createdPoint = await this.PointModel.create(point);
    return createdPoint;
  }

  async edit(point: IPoint, data: IPoint): Promise<void> {
    const editedPoint = await this.PointModel.updateOne(point, data);
  }

  async findById(id: string): Promise<IPoint> {
    const point = await this.PointModel.findById<IPoint>(id);

    if (!point) {
      throw new Error('Point not found');
    }
    return point;
  }
}
