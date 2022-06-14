import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
} from '@nestjs/common';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// import CreateSubscriberDto from './dto/createSubscriber.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('v1/subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export default class SubscribersController {
  constructor(
    @Inject('SUBSCRIBERS_SERVICE') private subscribersService: ClientProxy,
  ) {}

  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: any) {
    return this.subscribersService.send(
      {
        cmd: 'add-subscriber',
      },
      subscriber,
    );
  }

  // ...
}
