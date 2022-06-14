import { PointValidation } from '../../entities/Point/PointValidation';
import { IPointsRepository } from '../../repositories/IPointsRepository';
import { IEditPointDTO } from './EditPointDTO';

export class EditPointUseCase {
  constructor(
    private pointsRepository: IPointsRepository,
    private pointValidation: PointValidation
  ) {}

  async execute(data: IEditPointDTO, id: string) {
    this.pointValidation.validate(data);
    const point = await this.pointsRepository.findById(id);
    await this.pointsRepository.edit(point, data);
    const editedPoint = await this.pointsRepository.findById(id);
    return editedPoint;
  }
}
