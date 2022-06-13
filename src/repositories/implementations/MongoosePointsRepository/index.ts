import { PointModel } from './MongoosePointModel';
import { MongoosePointsRepository } from './MongoosePointsRepository';

const mongoosePointsRepository = new MongoosePointsRepository(PointModel);

export { mongoosePointsRepository };
