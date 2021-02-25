import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

const userCtrl = new UserController();

router.post('/users',userCtrl.create)

export { router };