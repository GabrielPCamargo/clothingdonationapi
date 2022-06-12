import { CreatePointController } from './CreatePointController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { CreatePointUseCase } from './CreatePointUseCase';

const createPointUseCase = new CreatePointUseCase(mongoosePointsRepository);
const createPointController = new CreatePointController(createPointUseCase);

export { createPointController };
