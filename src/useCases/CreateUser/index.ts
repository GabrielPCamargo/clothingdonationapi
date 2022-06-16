import { UserValidation } from '../../entities/User/UserValidation';
import { mongooseUsersRepostitory } from '../../repositories/implementations/MongooseUsersRepository';
import { CreateUserContoller } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const userValidation = new UserValidation();

const createUserUseCase = new CreateUserUseCase(
  mongooseUsersRepostitory,
  userValidation
);
const createUserController = new CreateUserContoller(createUserUseCase);

export { createUserController };
