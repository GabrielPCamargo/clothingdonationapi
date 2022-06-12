import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { indexPointsController } from '../useCases/IndexPoints';

const route = Router();

route.get('/', (req, res) => indexPointsController.handle(req, res));
/*route.post('/', auth, PointController.store);
route.get('/:id', PointController.show);
route.put('/:id/edit', PointController.update);
route.delete('/:id/delete', PointController.delete);*/

export default route;
