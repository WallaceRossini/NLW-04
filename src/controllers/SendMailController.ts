import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepostiry";
import SendMailService from "../services/SendMailService";

class SendMailController {

  async execute(request: Request, response: Response) {

    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveysUserRepository = getCustomRepository(SurveysUsersRepository);

    const user = await userRepository.findOne({ where: { email } })

    if (!user)
      return response.status(400).json({
        error: "User does not exists"
      })

    const survey = await surveyRepository.findOne({ where: { id: survey_id } })

    if (!survey)
      return response.status(400).json({
        error: "Survey does not exists"
      })

    const variebles = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    }

    const surveyUserAlreadyExists = await surveysUserRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations:["user","survey"]
    })

    if(surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variebles, 'npmMail');
      return response.json(surveyUserAlreadyExists)
    }


    const surveyUser = surveysUserRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUserRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variebles, 'npmMail');

    return response.status(201).json(surveyUser)

  }
}

export { SendMailController };
