/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPoint } from '../../entities/Point/IPoint';
import { IPointsRepository } from '../../repositories/IPointsRepository';
import { IndexPointsUseCase } from './IndexPointsUseCase';

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

describe('IndexPointsUseCase', () => {
  let pointsRepositoryMock: PointsRepository;
  let sut: IndexPointsUseCase;

  beforeAll(() => {
    pointsRepositoryMock = new PointsRepository();
    sut = new IndexPointsUseCase(pointsRepositoryMock);
  });
  it('should delete a point', async () => {
    let error = '';

    const pointsRepositoryMockSpy = jest.spyOn(pointsRepositoryMock, 'getAll');

    try {
      expect(await sut.execute()).not.toThrow();
    } catch (err: any) {
      error = err.message;
    }

    expect(pointsRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });
});
