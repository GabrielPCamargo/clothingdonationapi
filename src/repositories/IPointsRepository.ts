import { IPoint } from '../entities/Point/IPoint';

export interface IPointsRepository {
  getAll(): Promise<IPoint[]>;
  create(point: IPoint): Promise<IPoint>;
  edit(point: IPoint, data: IPoint): Promise<void>;
  findById(id: string): Promise<IPoint>;
}
