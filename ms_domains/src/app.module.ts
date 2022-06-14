import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { BeltsModule } from './belts/belts.module';
import { BeltDegreesModule } from './belt_degrees/belt_degree.module';
import { AuthModule } from '@commons/modules/auth/auth.module';

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
    BeltsModule,
    BeltDegreesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
