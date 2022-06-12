import { IPoint } from './IPoint';
import { uuid } from 'uuidv4';

export class Point implements IPoint {
  public readonly _id: string;
  public name: string;
  public description: string;
  public coordinates: { lat: number; lng: number };
  public user: {
    name: string;
    email: string;
    number: number;
  };
  public type: string;

  constructor(props: Omit<Point, '_id'>) {
    Object.assign(this, props);

    if (!this._id) {
      this._id = uuid();
    }
  }
}
