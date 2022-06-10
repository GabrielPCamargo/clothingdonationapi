import { Router } from 'express';
import PointController from '../controllers/PointController';
import { auth } from '../middlewares/auth';

const route = Router();

route.get('/', PointController.index);
route.post('/', auth, PointController.store);
route.get('/:id', PointController.show);
route.put('/:id/edit', PointController.update);
route.delete('/:id/delete', PointController.delete);

export default route;