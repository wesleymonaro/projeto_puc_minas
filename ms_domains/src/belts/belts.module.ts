import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeltEntity } from '@commons/entities/belt/belt.entity';
import { BeltDegreeColorEntity } from '@commons/entities/belt_degree_color/belt_degree_color.entity';
import { BeltsController } from './belts.controller';
import { BeltsService } from './belts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BeltEntity]),
    TypeOrmModule.forFeature([BeltDegreeColorEntity]),
  ],
  controllers: [BeltsController],
  providers: [BeltsService],
})
export class BeltsModule {}
