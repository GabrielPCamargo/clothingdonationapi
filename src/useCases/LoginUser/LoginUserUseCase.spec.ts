import bcrypt from 'bcrypt';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from '../../entities/User/IUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { LoginUserUseCase } from './LoginUserUseCase';
import dotenv from 'dotenv';

dotenv.config();

class UsersRepository implements IUsersRepository {
  async create(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve({} as IUser);
    });
  }
  async findByEmail(id: string): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve({
        name: 'teste',
        password: bcrypt.hashSync('tes6tets', 8),
        email: 'teste@teste.com',
        type: 'email',
      } as IUser);
    });
  }
}

describe('LoginUserUseCase', () => {
  let usersRepositoryMock: UsersRepository;
  let sut: LoginUserUseCase;

  it('should login', async () => {
    usersRepositoryMock = new UsersRepository();
    sut = new LoginUserUseCase(usersRepositoryMock);

    const data = {
      email: 'testee@example.com',
      password: 'tes6tets',
    };

    const usersRepositoryMockSpy = jest.spyOn(
      usersRepositoryMock,
      'findByEmail'
    );

    const response = await sut.execute(data);
    try {
      expect(response).toContain(data.email);
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('password');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('type');
    } catch (err: any) {
      expect(err.message).not.toContain('Invalid Password');
    }

    expect(usersRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should not login', async () => {
    usersRepositoryMock = new UsersRepository();
    sut = new LoginUserUseCase(usersRepositoryMock);

    const data = {
      email: 'testee@example.com',
      password: 'tes6tet454',
    };

    const usersRepositoryMockSpy = jest.spyOn(
      usersRepositoryMock,
      'findByEmail'
    );

    try {
      const response = await sut.execute(data);
      expect(response).toContain(data);
      expect(response).not.toHaveProperty('token');
    } catch (err: any) {
      expect(err.message).toContain('Invalid Password');
    }

    expect(usersRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });
});
