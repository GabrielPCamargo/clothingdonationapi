import { DeletePointController } from './DeletePointController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { DeletePointUseCase } from './DeletePointUseCase';

const deletePointUseCase = new DeletePointUseCase(mongoosePointsRepository);
const deletePointController = new DeletePointController(deletePointUseCase);

export { deletePointController };
