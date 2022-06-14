import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeltEntity } from '@commons/entities/belt/belt.entity';
import { BeltDegreeColorEntity } from '@commons/entities/belt_degree_color/belt_degree_color.entity';
import { BeltDegreesController } from './belt_degree.controller';
import { BeltDegreesService } from './belt_degree.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BeltEntity]),
    TypeOrmModule.forFeature([BeltDegreeColorEntity]),
  ],
  controllers: [BeltDegreesController],
  providers: [BeltDegreesService],
})
export class BeltDegreesModule {}
