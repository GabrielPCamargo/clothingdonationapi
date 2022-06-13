import { IPoint } from '../../entities/Point/IPoint';
import { Point } from '../../entities/Point/Point';
import { PointValidation } from '../../entities/Point/PointValidation';
import { IPointsRepository } from '../../repositories/IPointsRepository';

export class CreatePointUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  async execute(data: IPoint) {
    const validation = new PointValidation(data);
    validation.validate();
    const point = new Point(data);
    await this.pointsRepository.create(point);
    return point;
  }
}
