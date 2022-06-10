import { CustomRequest } from './../middlewares/auth';
import { Request, Response } from 'express';
import { Point } from '../models/Point';

type PointControllerProps = {
  index: (req: Request, res: Response) => Promise<Response>;
  store: (req: Request, res: Response) => Promise<Response>;
  show: (req: Request, res: Response) => Promise<Response>;
  update: (req: Request, res: Response) => Promise<Response>;
};

class PointController implements PointControllerProps {
  async index(req: CustomRequest, res: Response) {
    const points = await Point.getAll();
    return res.json(points);
  }

  async store(req: CustomRequest, res: Response) {
    const point = new Point(req.body);
    const data = await point.create();

    if (point.errors.length > 0) {
      return res.status(400).json({ errors: point.errors });
    }

    return res.json(data);
  }

  async show(req: Request, res: Response) {
    const point = await Point.findOne(req.params.id);

    if (!point) {
      return res.status(400).json({ error: 'Error finding point' });
    }

    return res.json(point);
  }

  async update(req: Request, res: Response) {
    const point = new Point({ ...req.body, id: req.params.id });
    const updatedPoint = await point.update();

    if (point.errors.length > 0) {
      return res.status(400).json({
        errors: point.errors,
      });
    }

    return res.json(updatedPoint);
  }
}

export default new PointController();
