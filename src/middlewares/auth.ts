import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IUser } from '../entities/User/IUser';
import { AuthRequest } from './IAuthRequest';

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(400).json({ error: 'Invalid authorization' });
    return;
  }
  const token = authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);

  if (!decoded) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  req.user = decoded as IUser;

  next();
};
