import { Response } from 'express';
import { IUser } from '../../entities/User/IUser';
import { AuthRequest } from '../../middlewares/IAuthRequest';
import { CreatePointUseCase } from './CreatePointUseCase';

export class CreatePointController {
  constructor(private createPointUseCase: CreatePointUseCase) {}

  async handle(req: AuthRequest, res: Response): Promise<Response> {
    const { name, description, coordinates, type, number } = req.body;
    const user = req.user as Omit<IUser, 'password'>;
    try {
      const createdPoint = await this.createPointUseCase.execute({
        name,
        description,
        coordinates,
        type,
        number,
        user,
      });
      return res.status(201).json(createdPoint);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
