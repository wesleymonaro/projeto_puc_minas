import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '@commons/entities/address/address.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UserEntity } from '@commons/entities/users/user.entity';
import { StudentEntity } from '@commons/entities/students/students.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([AddressEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
