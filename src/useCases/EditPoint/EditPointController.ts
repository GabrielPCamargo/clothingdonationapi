import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { IUser } from '../../entities/User/IUser';
import { AuthRequest } from '../../middlewares/IAuthRequest';
import { EditPointUseCase } from './EditPointUseCase';

export class EditPointController {
  constructor(private editPointUseCase: EditPointUseCase) {}

  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { name, description, coordinates, type, number } = req.body;
    const user = req.user as Omit<IUser, 'password'>;
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    try {
      const editdPoint = await this.editPointUseCase.execute(
        {
          name,
          description,
          coordinates,
          type,
          number,
          user,
          _id: id,
        },
        id
      );
      return res.json(editdPoint);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
