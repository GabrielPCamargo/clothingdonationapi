import { validate as uuidValidate } from 'uuid';
import { Request, Response } from 'express';
import { DeletePointUseCase } from './DeletePointUseCase';

export class DeletePointController {
  constructor(private deletePointUseCase: DeletePointUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
      await this.deletePointUseCase.execute(id);
      return res.json({ deleted: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
