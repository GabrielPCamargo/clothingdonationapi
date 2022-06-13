import { MongooseUsersRepository } from './MongooseUsersRepository';
import { UserModel } from './MongooseUserModel';

const mongooseUsersRepostitory = new MongooseUsersRepository(UserModel);

export { mongooseUsersRepostitory };
