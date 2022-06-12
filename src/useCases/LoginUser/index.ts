import { mongooseUsersRepostitory } from '../../repositories/implementations/MongooseUsersRepository';
import { LoginUserContoller } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

const loginUserUseCase = new LoginUserUseCase(mongooseUsersRepostitory);
const loginUserController = new LoginUserContoller(loginUserUseCase);

export { loginUserController };
