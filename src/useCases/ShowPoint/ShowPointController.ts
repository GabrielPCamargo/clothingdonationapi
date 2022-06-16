import { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { ShowPointUseCase } from './ShowPointUseCase';

export class ShowPointController {
  constructor(private showPointUseCase: ShowPointUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
      const points = await this.showPointUseCase.execute(id);
      return res.json(points);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
