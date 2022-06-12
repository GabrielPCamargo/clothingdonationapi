import { PointModel } from './MongoosePointSchema';
import { MongoosePointsRepository } from './MongoosePointsRepository';

const mongoosePointsRepository = new MongoosePointsRepository(PointModel);

export { mongoosePointsRepository };
