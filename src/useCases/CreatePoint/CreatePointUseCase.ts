import { IPoint } from '../../entities/Point/IPoint';
import { PointValidation } from '../../entities/Point/PointValidation';
import { IPointsRepository } from '../../repositories/IPointsRepository';

export class CreatePointUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  execute(data: IPoint) {
    const validation = new PointValidation(data);
    validation.validate();
    const points = this.pointsRepository.create(data);
    return points;
  }
}
