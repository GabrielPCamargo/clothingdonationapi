import { jwtPayload } from './middlewares/auth';

declare namespace Express {
  export interface Request {
    user?: jwtPayload;
  }
}
