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

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
    if (!decoded) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const { name, email, type } = decoded as IUser;
    req.user = { name, email, type };
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid authorization' });
  }
};
