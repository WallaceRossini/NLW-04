import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userCtrl = new UserController();
const surveyCtrl = new SurveyController();
const sendMailCtrl = new SendMailController();

router.post('/users', userCtrl.create);
router.post('/surveys', surveyCtrl.create);
router.get('/surveys', surveyCtrl.show);
router.post('/sendMail',sendMailCtrl.execute);

export { router };