import { IndexPointsController } from './IndexPointsController';
import { mongoosePointsRepository } from '../../repositories/implementations/MongoosePointsRepository';
import { IndexPointsUseCase } from './IndexPointsUseCase';

const indexPointsUseCase = new IndexPointsUseCase(mongoosePointsRepository);
const indexPointsController = new IndexPointsController(indexPointsUseCase);

export { indexPointsController };
