import { CustomRequest } from './../middlewares/auth';
import { Request, Response } from 'express';
import { Point } from '../models/Point';

class PointController {
  async index(req: CustomRequest, res: Response) {
  }

  async store(req: CustomRequest, res: Response) {
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

  async delete(req: Request, res: Response) {
    const point = new Point({ ...req.body, id: req.params.id });
    const updatedPoint = await point.delete();

    if (point.errors.length > 0) {
      return res.status(400).json({
        errors: point.errors,
      });
    }

    return res.json({ deleted: updatedPoint });
  }
}

export default new PointController();
