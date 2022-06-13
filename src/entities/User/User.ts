import { v4 as uuid } from 'uuid';
import { IUser } from './IUser';

export class User implements IUser {
  public readonly _id: string;
  public name: string;
  public email: string;
  public password: string;
  public type: string;

  constructor(props: Omit<User, '_id'>, id?: string) {
    Object.assign(this, props);

    if (!this._id) {
      this._id = uuid();
    }
  }
}
