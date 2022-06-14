import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { BeltEntity } from '@commons/entities/belt/belt.entity';

@Injectable()
export class BeltsService {
  constructor(
    @InjectRepository(BeltEntity)
    private beltsRepository: Repository<BeltEntity>,
  ) {}

  async findAll(): Promise<BeltEntity[]> {
    return this.beltsRepository.find({ active: true });
  }

  async findById(id: string): Promise<BeltEntity> {
    return this.beltsRepository.findOne(id);
  }
}
