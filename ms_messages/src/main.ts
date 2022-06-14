import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import dotenv from 'dotenv';
// dotenv.config({ path: '../config/.development.env' });
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import Amplify from 'aws-amplify';

async function bootstrap() {
  Amplify.configure({
    Auth: {
      mandatorySignId: true,
      region: process.env.AWS_REGION,
      userPoolId: process.env.AWS_COGNITO_USERS_POOL_ID,
      userPoolWebClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
      authenticationFlowType: 'USER_SRP_AUTH',
    },
  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
