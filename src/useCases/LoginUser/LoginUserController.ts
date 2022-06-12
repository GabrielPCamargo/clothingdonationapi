import { Request, Response } from 'express';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserContoller {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const createdUser = await this.loginUserUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(createdUser);
    } catch (err: any) {
      return res.status(401).json({
        error: err.message,
      });
    }
  }
}
