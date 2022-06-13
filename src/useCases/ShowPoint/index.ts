import { ShowPointController } from './ShowPointController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { ShowPointUseCase } from './ShowPointUseCase';

const showPointUseCase = new ShowPointUseCase(mongoosePointsRepository);
const showPointController = new ShowPointController(showPointUseCase);

export { showPointController };
