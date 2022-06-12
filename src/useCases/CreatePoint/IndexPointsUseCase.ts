import { IPointsRepository } from '../../repositories/IPointsRepository';

export class IndexPointsUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  execute() {
    const points = this.pointsRepository.getAll();
    return points;
  }
}
