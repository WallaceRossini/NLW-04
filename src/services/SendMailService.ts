import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {

  private client: Transporter

  constructor() {

    nodemailer.createTestAccount().then(account => {

      const transporter = nodemailer.createTransport({

        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }

      });

      this.client = transporter;

    });
  }

  async execute(to: string, subject: string, variables: object, file: string) {

    const npmPath = resolve(__dirname, '..', 'views', 'mails', `${file}.hbs`)

    const templateFileContext = fs.readFileSync(npmPath).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContext);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreplay@nps.com.br>"
    })

    console.log(`Message send: ${message.messageId}`);
    console.log(`Preview url: ${nodemailer.getTestMessageUrl(message)}`);
  }

}

export default new SendMailService();