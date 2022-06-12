import { Request } from 'express';
import { IUser } from '../entities/User/IUser';

export interface AuthRequest extends Request {
  user?: Omit<IUser, 'password'>;
}
