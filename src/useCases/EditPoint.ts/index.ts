import { EditPointController } from './EditPointController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { EditPointUseCase } from './EditPointUseCase';

const editPointUseCase = new EditPointUseCase(mongoosePointsRepository);
const editPointController = new EditPointController(editPointUseCase);

export { editPointController };
