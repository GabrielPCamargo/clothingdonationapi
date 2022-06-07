import { CustomRequest } from './../middlewares/auth';
import { Request, Response } from 'express';

type PointControllerProps = {
  index: (req: Request, res: Response) => Response;
};

class PointController implements PointControllerProps {
  index(req: CustomRequest, res: Response) {
    return res.json(req.user);
  }
}

export default new PointController();
