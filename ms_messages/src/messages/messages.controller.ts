import { EVENT_STUDENT_CREATED } from '@commons/consts';
import { decrypt } from '@commons/helpers/bcrypt';
import {
  AuthCognitoRequest,
  createUserInCognito,
} from '@commons/helpers/cognito';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @EventPattern(EVENT_STUDENT_CREATED)
  async handleUserCreatedEvent(data: Record<any, any>) {
    await createUserInCognito(data as AuthCognitoRequest);
    console.log(`Usuário ${data.username} criado no Cognito`);
    // TODO - SEND EMAIL
    // TODO - DECRYPT PASS
    this.messagesService.example();
  }
}
