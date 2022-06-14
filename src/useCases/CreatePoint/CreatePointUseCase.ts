import { IPoint } from '../../entities/Point/IPoint';
import { Point } from '../../entities/Point/Point';
import { PointValidation } from '../../entities/Point/PointValidation';
import { IPointsRepository } from '../../repositories/IPointsRepository';

export class CreatePointUseCase {
  constructor(
    private pointsRepository: IPointsRepository,
    private pointValidation: PointValidation
  ) {}

  async execute(data: IPoint) {
    this.pointValidation.validate(data);
    const point = new Point(data);
    await this.pointsRepository.create(point);
    return point;
  }
}
