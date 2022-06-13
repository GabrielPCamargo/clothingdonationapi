import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { createPointController } from '../useCases/CreatePoint';
import { deletePointController } from '../useCases/DeletePoint';
import { editPointController } from '../useCases/EditPoint';
import { indexPointsController } from '../useCases/IndexPoints';
import { showPointController } from '../useCases/ShowPoint';

const route = Router();

route.get('/', (req, res) => indexPointsController.handle(req, res));
route.post('/', auth, (req, res) => createPointController.handle(req, res));
route.get('/:id', auth, (req, res) => showPointController.handle(req, res));
route.put('/:id/edit', auth, (req, res) =>
  editPointController.handle(req, res)
);
route.delete('/:id/delete', auth, (req, res) =>
  deletePointController.handle(req, res)
);

export default route;
