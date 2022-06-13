import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserContoller {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, type } = req.body;

    try {
      const createdUser = await this.createUserUseCase.execute({
        name,
        email,
        password,
        type,
      });

      return res.status(201).json(createdUser);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === 11000) {
        err.message = 'E-mail já cadastrado';
      }
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
