import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userCtrl = new UserController();
const surveyCtrl = new SurveyController();

router.post('/users', userCtrl.create);
router.post('/surveys', surveyCtrl.create);
router.get('/surveys', surveyCtrl.show);

export { router };