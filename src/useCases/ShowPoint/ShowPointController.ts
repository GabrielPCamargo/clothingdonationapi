import { Request, Response } from 'express';
import { ShowPointUseCase } from './ShowPointUseCase';

export class ShowPointController {
  constructor(private showPointUseCase: ShowPointUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const points = await this.showPointUseCase.execute(id);
      return res.json(points);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
