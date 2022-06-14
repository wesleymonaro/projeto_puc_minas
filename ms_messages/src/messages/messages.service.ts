import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagesService {
  constructor(private readonly mailerService: MailerService) {}

  public example(): void {
    this.mailerService
      .sendMail({
        to: 'wesleymonaro@hotmail.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
        console.log('enviado com sucesso');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
