import { Router } from 'express';
import { createUserController } from '../useCases/CreateUser';
import { loginUserController } from '../useCases/LoginUser';

const route = Router();

route.post('/register', (req, res) => createUserController.handle(req, res));
route.post('/login', (req, res) => loginUserController.handle(req, res));

export default route;
