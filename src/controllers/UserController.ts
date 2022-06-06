import { User } from '../models/User';
import { Request, Response } from 'express';

type UserControllerProps = {
  store: (req: Request, res: Response) => Promise<Response>;
};

class UserController implements UserControllerProps {
  async store(req: Request, res: Response) {
    const user = new User(req.body);
    await user.create();

    if (user.errors.length > 0) {
      return res.status(400).json({
        errors: user.errors,
      });
    }

    return res.json(user.getData());
  }
}

export default new UserController();
