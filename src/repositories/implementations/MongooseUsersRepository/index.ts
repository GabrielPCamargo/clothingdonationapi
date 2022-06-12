import { MongooseUsersRepository } from './MongooseUsersRepository';
import { UserModel } from './MongooseUserSchema';

const mongooseUsersRepostitory = new MongooseUsersRepository(UserModel);

export { mongooseUsersRepostitory };
