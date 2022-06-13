import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { createPointController } from '../useCases/CreatePoint';
import { editPointController } from '../useCases/EditPoint.ts';
import { indexPointsController } from '../useCases/IndexPoints';

const route = Router();

route.get('/', (req, res) => indexPointsController.handle(req, res));
route.post('/', auth, (req, res) => createPointController.handle(req, res));
//route.get('/:id', auth, (req, res) => editPointController.handle(req, res));
route.put('/:id/edit', auth, (req, res) =>
  editPointController.handle(req, res)
);
//route.delete('/:id/delete', PointController.delete);

export default route;
