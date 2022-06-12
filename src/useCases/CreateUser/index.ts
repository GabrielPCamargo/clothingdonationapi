import { mongooseUsersRepostitory } from '../../repositories/implementations/MongooseUsersRepository';
import { CreateUserContoller } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const createUserUseCase = new CreateUserUseCase(mongooseUsersRepostitory);
const createUserController = new CreateUserContoller(createUserUseCase);

export { createUserController };
