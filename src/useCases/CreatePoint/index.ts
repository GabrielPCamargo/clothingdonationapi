import { CreatePointController } from './CreatePointController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { CreatePointUseCase } from './CreatePointUseCase';
import { PointValidation } from '../../entities/Point/PointValidation';

const pointValidation = new PointValidation();

const createPointUseCase = new CreatePointUseCase(
  mongoosePointsRepository,
  pointValidation
);
const createPointController = new CreatePointController(createPointUseCase);

export { createPointController };
