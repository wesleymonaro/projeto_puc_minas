import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { TeacherResponse } from 'src/dto/response/teacher.dto.response';
import { TeacherRequest } from 'src/dto/request/teacher.dto.request';
import { TeacherEntity } from '@commons/entities/teachers/teachers.entity';
import { AuthGuard } from '@nestjs/passport';
import { RequestType } from '@commons/types/RequestType';
import { RESOURCE_NOT_ALLOWED_MESSAGE } from '@commons/consts';

@ApiTags('Teachers')
@Controller('/v1/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req: RequestType): Promise<TeacherEntity[]> {
    return this.teachersService.findAll(req.user.dojoId);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async search(
    @Request() req: RequestType,
    @Query('name') name: string,
  ): Promise<TeacherEntity[]> {
    return this.teachersService.search(req.user.dojoId, { name });
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findById(
    @Request() req: RequestType,
    @Param('id') id: string,
  ): Promise<TeacherEntity> {
    const teacher = await this.teachersService.findById(id);
    if (
      req.user.dojoId !== 'all' &&
      teacher.dojo.id.toString() !== req.user.dojoId
    ) {
      throw new HttpException(
        RESOURCE_NOT_ALLOWED_MESSAGE,
        HttpStatus.FORBIDDEN,
      );
    }
    return teacher;
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: TeacherResponse })
  async create(@Request() req: RequestType, @Body() teacher: TeacherRequest) {
    return this.teachersService.create(req.user.dojoId, teacher);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() req: RequestType,
    @Param('id') id: string,
    @Body() teacher: TeacherRequest,
  ) {
    return this.teachersService.update(id, teacher);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req: RequestType, @Param('id') id: string) {
    return this.teachersService.delete(id);
  }
}
