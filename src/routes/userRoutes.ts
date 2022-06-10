import { Router } from 'express';
import UserController from '../controllers/UserController';

const route = Router();

route.post('/register', UserController.store);
route.post('/login', UserController.show);

export default route;
