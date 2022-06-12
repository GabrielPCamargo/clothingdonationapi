import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { createPointController } from '../useCases/CreatePoint';
import { indexPointsController } from '../useCases/IndexPoints';

const route = Router();

route.get('/', (req, res) => indexPointsController.handle(req, res));
route.post('/', auth, (req, res) => createPointController.handle(req, res));
/*route.get('/:id', PointController.show);
route.put('/:id/edit', PointController.update);
route.delete('/:id/delete', PointController.delete);*/

export default route;
