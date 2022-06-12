import { IUser } from '../../entities/User/IUser';
import { User } from '../../entities/User/User';
import { UserValidation } from '../../entities/User/UserValidation';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<IUser> {
    const validation = new UserValidation(data);
    validation.validate();
    const user = new User(data);
    const newUser = await this.usersRepository.create(user);
    return newUser;
  }

  /*if (user.errors.length > 0) {
      verificação
      return res.status(400).json({
        errors: user.errors,
      });
    }
    user.getData()*/
}
