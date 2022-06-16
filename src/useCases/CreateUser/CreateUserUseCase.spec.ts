/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from '../../entities/User/IUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserValidation } from './../../entities/User/UserValidation';
import { CreateUserUseCase } from './CreateUserUseCase';

class UsersRepository implements IUsersRepository {
  async create(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve({} as IUser);
    });
  }
  async findByEmail(id: string): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve({} as IUser);
    });
  }
}

class ValidationMock extends UserValidation {
  validate() {
    return true;
  }
}

class ValidationMockError extends UserValidation {
  validate() {
    throw new Error('error');
    return false;
  }
}

describe('CreateUserUseCase', () => {
  let usersRepositoryMock: UsersRepository;
  let validationMock: UserValidation;
  let sut: CreateUserUseCase;

  it('should create a point', async () => {
    usersRepositoryMock = new UsersRepository();
    validationMock = new ValidationMock();
    sut = new CreateUserUseCase(usersRepositoryMock, validationMock);

    const data = {
      name: 'testee',
      email: 'testee@example.com',
      password: 'testets',
      type: 'request',
    };

    let error = '';

    const usersRepositoryMockSpy = jest.spyOn(usersRepositoryMock, 'create');
    const validationMockSpy = jest.spyOn(validationMock, 'validate');

    try {
      const response = await sut.execute(data);
      expect(response).toBe(data);
    } catch (err: any) {
      error = err.message;
    }

    expect(usersRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(validationMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should not create a point', async () => {
    usersRepositoryMock = new UsersRepository();
    validationMock = new ValidationMockError();
    sut = new CreateUserUseCase(usersRepositoryMock, validationMock);
    const data = {
      name: 'testee',
      email: 'testee@example.com',
      password: 'testets',
      type: 'request',
    };

    let error = '';

    const validationMockSpy = jest.spyOn(validationMock, 'validate');
    const usersRepositoryMockSpy = jest.spyOn(usersRepositoryMock, 'create');

    try {
      const response = await sut.execute(data);
      expect(response).toBe(data);
    } catch (err: any) {
      error = err.message;
      expect(error).toContain('error');
    }

    expect(validationMockSpy).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMockSpy).not.toHaveBeenCalled();
  });
});
