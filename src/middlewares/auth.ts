import jwt from 'jsonwebtoken';
import { UserData } from '../models/User';
import { Request, Response, NextFunction } from 'express';

export interface jwtPayload {
  name: string;
  email: string;
  type: string;
}

export interface CustomRequest extends Request {
  user?: UserData;
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
    res.status(400).json({ error: 'Not authorized' });
    return;
  }

  req.user = decoded as UserData;

  next();
};
