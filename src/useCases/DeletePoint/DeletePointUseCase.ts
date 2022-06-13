import { IPointsRepository } from '../../repositories/IPointsRepository';

export class DeletePointUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  execute(id: string) {
    const point = this.pointsRepository.delete(id);
    return point;
  }
}
