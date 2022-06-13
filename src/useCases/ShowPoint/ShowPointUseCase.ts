import { IPointsRepository } from '../../repositories/IPointsRepository';

export class ShowPointUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  execute(id: string) {
    const point = this.pointsRepository.findById(id);
    return point;
  }
}
