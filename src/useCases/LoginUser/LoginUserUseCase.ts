import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../../entities/User/IUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ILoginUserRequestDTO } from './LoginUserDTO';

export class LoginUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(
    data: ILoginUserRequestDTO
  ): Promise<Omit<IUser, 'password'> & { token: string }> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Error('Invalid Password');
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        type: user.type,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      }
    );

    return {
      name: user.name,
      email: user.email,
      type: user.type,
      token,
    };
  }
}
