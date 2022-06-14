import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import Amplify, { Auth } from 'aws-amplify';
import { Global } from '@commons/types/Global';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Dojos MS')
    .setDescription('MS de dojos')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  Amplify.configure({
    Auth: {
      mandatorySignId: true,
      region: process.env.AWS_REGION,
      userPoolId: process.env.AWS_COGNITO_USERS_POOL_ID,
      userPoolWebClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
      authenticationFlowType: 'USER_SRP_AUTH',
    },
  });

  const { signInUserSession } = await Auth.signIn(
    process.env.COGNITO_APIS_USER,
    process.env.COGNITO_APIS_PASSWORD,
  );

  Global.tokens = {
    token: signInUserSession.idToken.jwtToken,
    refreshToken: signInUserSession.refreshToken.token,
    accessToken: signInUserSession.accessToken.jwtToken,
    createdAt: signInUserSession.idToken.payload.iat,
    expireAt: signInUserSession.idToken.payload.exp,
  };

  app.enableCors();

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.DOJOS_PORT || 3000);
}
bootstrap();
