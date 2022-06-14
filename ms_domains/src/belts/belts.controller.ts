import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeltEntity } from '@commons/entities/belt/belt.entity';
import { BeltsService } from './belts.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Domains')
@Controller('/v1/belts')
export class BeltsController {
  constructor(private readonly beltsService: BeltsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAllBelts(): Promise<BeltEntity[]> {
    return this.beltsService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<BeltEntity> {
    return this.beltsService.findById(id);
  }
}
