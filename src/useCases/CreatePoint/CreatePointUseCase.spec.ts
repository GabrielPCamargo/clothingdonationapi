/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPoint } from '../../entities/Point/IPoint';
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

function createSut() {
  const pointsRepositoryMock = new PointsRepository();
  const sut = new CreatePointUseCase(pointsRepositoryMock, {});
  return { sut, pointsRepositoryMock };
}

describe('CreatePointUseCase', () => {
  it('should create a point', async () => {
    const { sut, pointsRepositoryMock } = createSut();
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

    try {
      const response = await sut.execute(data);
      expect(response).toBe(data);
    } catch (err: any) {
      error = err.message;
    }

    expect(pointsRepositoryMockSpy).toHaveBeenCalled();
  });
});

describe('CreatePointUseCase', () => {
  it('should create a point', async () => {
    const { sut, pointsRepositoryMock } = createSut();
    const error = '';
    const data = {
      name: '',
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

    try {
      const response = await sut.execute(data);
      expect(response).toBe(data);
    } catch (err: any) {
      expect(err.message).toContain(
        'Name must have between 4 and 255 characters'
      );
    }

    expect(pointsRepositoryMockSpy).not.toHaveBeenCalled();
  });
});
