import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userCtrl = new UserController();
const surveyCtrl = new SurveyController();
const sendMailCtrl = new SendMailController();
const answerCtrl = new AnswerController();
const npsCtrl = new NpsController();

router.post('/users', userCtrl.create);
router.post('/surveys', surveyCtrl.create);
router.get('/surveys', surveyCtrl.show);
router.post('/sendMail',sendMailCtrl.execute);
router.get('/answers/:value',answerCtrl.execute);
router.get('/nps/:survey_id',npsCtrl.execute);

export { router };