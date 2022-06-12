import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../entities/User/IUser';

export interface jwtPayload {
  name: string;
  email: string;
  type: string;
}

export interface CustomRequest extends Request {
  user?: IUser;
}

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(400).json({ error: 'Invalid authorization' });
    return;
  }
  const token = authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);

  if (!decoded) {
    res.status(401).json({ error: 'Not authorized' });
    return;
  }

  req.user = decoded as IUser;

  next();
};
