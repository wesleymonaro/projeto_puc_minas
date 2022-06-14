import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { UserEntity } from '@commons/entities/users/user.entity';
import { TeacherEntity } from '@commons/entities/teachers/teachers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
