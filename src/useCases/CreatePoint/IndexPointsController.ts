import { Request, Response } from 'express';
import { IndexPointsUseCase } from './IndexPointsUseCase';

export class IndexPointsController {
  constructor(private indexPointsUseCase: IndexPointsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const points = await this.indexPointsUseCase.execute();
      return res.json(points);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
