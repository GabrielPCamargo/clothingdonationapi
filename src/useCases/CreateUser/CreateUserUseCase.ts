import { IUser } from '../../entities/User/IUser';
import { User } from '../../entities/User/User';
import { UserValidation } from '../../entities/User/UserValidation';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly userValidation: UserValidation
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<Omit<IUser, 'password'>> {
    this.userValidation.validate(data);
    const user = new User(data);
    const newUser = await this.usersRepository.create(user);
    const { _id, name, email, type } = newUser;
    return { _id, name, email, type };
  }

  /*if (user.errors.length > 0) {
      verificação
      return res.status(400).json({
        errors: user.errors,
      });
    }
    user.getData()*/
}
