import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeltDegreeColorEntity } from '@commons/entities/belt_degree_color/belt_degree_color.entity';
import { BeltDegreesService } from './belt_degree.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Domains')
@Controller('/v1/beltDegrees')
export class BeltDegreesController {
  constructor(private readonly beltDegreesService: BeltDegreesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<BeltDegreeColorEntity[]> {
    return this.beltDegreesService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<BeltDegreeColorEntity> {
    return this.beltDegreesService.findById(id);
  }
}
