import { Module } from '@nestjs/common';
import { DojoModule } from './dojos/dojos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from '@commons/modules/auth/auth.module';
import { SubscribersModule } from './subscribers/subscribers.module';

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
    DojoModule,
    AuthModule,
    // SubscribersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
