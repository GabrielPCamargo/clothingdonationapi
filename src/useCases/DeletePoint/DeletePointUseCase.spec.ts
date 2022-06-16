/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPoint } from '../../entities/Point/IPoint';
import { IPointsRepository } from '../../repositories/IPointsRepository';
import { DeletePointUseCase } from './DeletePointUseCase';

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

describe('DeletePointUseCase', () => {
  let pointsRepositoryMock: PointsRepository;
  let sut: DeletePointUseCase;

  beforeAll(() => {
    pointsRepositoryMock = new PointsRepository();
    sut = new DeletePointUseCase(pointsRepositoryMock);
  });

  it('should delete a point', async () => {
    let error = '';

    const pointsRepositoryMockSpy = jest.spyOn(pointsRepositoryMock, 'delete');

    try {
      expect(await sut.execute('1')).not.toThrow();
    } catch (err: any) {
      error = err.message;
    }

    expect(pointsRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });
});
