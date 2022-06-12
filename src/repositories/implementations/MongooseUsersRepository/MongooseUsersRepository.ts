import { IUser } from './../../../entities/User/IUser';
import mongoose from 'mongoose';
import { IUsersRepository } from '../../IUsersRepository';

export class MongooseUsersRepository implements IUsersRepository {
  constructor(private UserModel: mongoose.Model<IUser>) {}
  async create(user: IUser): Promise<IUser> {
    const createdUser = new this.UserModel(user);
    await createdUser.save();
    return createdUser;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.UserModel.findOne<IUser>({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
