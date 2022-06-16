/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPoint } from '../../entities/Point/IPoint';
import { PointValidation } from '../../entities/Point/PointValidation';
import { IPointsRepository } from '../../repositories/IPointsRepository';
import { CreatePointUseCase } from './CreatePointUseCase';

class PointsRepository implements IPointsRepository {
  async getAll(): Promise<IPoint[]> {
    return new Promise<IPoint[]>((resolve, reject) => {
      resolve([] as IPoint[]);
    });
  }
  async create(point: IPoint): Promise<IPoint> {
    return new Promise<IPoint>((resolve, reject) => {
      resolve({} as IPoint);
    });
  }
  async edit(point: IPoint, data: IPoint): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  async findById(id: string): Promise<IPoint> {
    return new Promise<IPoint>((resolve, reject) => {
      resolve({} as IPoint);
    });
  }
  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

class ValidationMock extends PointValidation {
  create() {
    return true;
  }
}

describe('CreatePointUseCase', () => {
  let pointsRepositoryMock: PointsRepository;
  let validationMock: ValidationMock;
  let sut: CreatePointUseCase;

  beforeAll(() => {
    pointsRepositoryMock = new PointsRepository();
    validationMock = new ValidationMock();
    sut = new CreatePointUseCase(pointsRepositoryMock, validationMock);
  });

  it('should create a point', async () => {
    let error = '';
    const data = {
      name: 'testee',
      description: 'testeset',
      coordinates: {
        lat: 1,
        lng: 4,
      },
      user: {
        name: 'tst565e',
        email: 'email@gmail.com',
      },
      type: 'request',
      number: '5209250920',
    };

    const pointsRepositoryMockSpy = jest.spyOn(pointsRepositoryMock, 'create');
    const validationMockSpy = jest.spyOn(validationMock, 'validate');

    try {
      const response = await sut.execute(data);
      expect(response).toBe(data);
    } catch (err: any) {
      error = err.message;
    }

    expect(pointsRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(validationMockSpy).toHaveBeenCalledTimes(1);
    expect(async () => await sut.execute(data)).not.toThrow();
  });
});
