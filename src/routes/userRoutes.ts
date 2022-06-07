import { Router } from 'express';
import PointController from '../controllers/PointController';
import UserController from '../controllers/UserController';
import { auth } from '../middlewares/auth';

const route = Router();

route.post('/register', UserController.store);
route.post('/login', UserController.show);
route.get('/points', auth, PointController.index);

export default route;
