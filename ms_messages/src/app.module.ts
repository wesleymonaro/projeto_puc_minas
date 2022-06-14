import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./@config/.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_URL,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    MailerModule.forRootAsync({
      useFactory: async () => {
        const testAccount = await nodemailer.createTestAccount();

        return {
          transport: `smtps://${testAccount.user}:${testAccount.pass}@smtp.ethereal.email`,
          defaults: {
            from: '"JJSys" <contato@jjsys.com.br>',
          },
          template: {
            dir: path.join(process.env.PWD, 'templates/pages'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: path.join(process.env.PWD, 'templates/partials'),
              options: {
                strict: true,
              },
            },
          },
        };
      },
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
