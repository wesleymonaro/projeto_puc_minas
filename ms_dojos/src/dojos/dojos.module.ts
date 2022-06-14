import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DojosController } from './dojos.controller';
import { DojosService } from './dojos.service';
import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { AddressEntity } from '@commons/entities/address/address.entity';
import { UserEntity } from '@commons/entities/users/user.entity';
import { ClassEntity } from '@commons/entities/classes/class.entity';
import { ClassesService } from './classes/classes.service';
import { PresencesService } from './presences/presences.service';
import { PresenceEntity } from '@commons/entities/presences/presence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DojoEntity]),
    TypeOrmModule.forFeature([AddressEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([ClassEntity]),
    TypeOrmModule.forFeature([PresenceEntity]),
  ],
  controllers: [DojosController],
  providers: [DojosService, ClassesService, PresencesService],
})
export class DojoModule {}
