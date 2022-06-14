import { EditPointController } from './EditPointController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { EditPointUseCase } from './EditPointUseCase';
import { PointValidation } from '../../entities/Point/PointValidation';

const pointValidation = new PointValidation();

const editPointUseCase = new EditPointUseCase(
  mongoosePointsRepository,
  pointValidation
);
const editPointController = new EditPointController(editPointUseCase);

export { editPointController };
