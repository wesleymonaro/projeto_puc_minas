import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { BeltDegreeColorEntity } from '@commons/entities/belt_degree_color/belt_degree_color.entity';

@Injectable()
export class BeltDegreesService {
  constructor(
    @InjectRepository(BeltDegreeColorEntity)
    private beltDegreesRepository: Repository<BeltDegreeColorEntity>,
  ) {}

  async findAll(): Promise<BeltDegreeColorEntity[]> {
    return this.beltDegreesRepository.find({ active: true });
  }

  async findById(id: string): Promise<BeltDegreeColorEntity> {
    return this.beltDegreesRepository.findOne(id);
  }
}
