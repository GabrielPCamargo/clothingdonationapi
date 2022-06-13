import { Response } from 'express';
import { IUser } from '../../entities/User/IUser';
import { AuthRequest } from '../../middlewares/IAuthRequest';
import { EditPointUseCase } from './EditPointUseCase';

export class EditPointController {
  constructor(private editPointUseCase: EditPointUseCase) {}

  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { name, description, coordinates, type, number } = req.body;
    const user = req.user as Omit<IUser, 'password'>;
    const id = req.params.id;
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
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
