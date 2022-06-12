import { IUser } from '../entities/User/IUser';

export interface IUsersRepository {
  create: (user: IUser) => Promise<IUser>;
  findByEmail: (email: string) => Promise<IUser>;
}
