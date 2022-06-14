import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { StudentResponse } from 'src/dto/response/student.dto.response';
import { StudentRequest } from 'src/dto/request/student.dto.request';
import { StudentEntity } from '@commons/entities/students/students.entity';
import { AuthGuard } from '@nestjs/passport';
import { RequestType } from '@commons/types/RequestType';

@ApiTags('Students')
@Controller('/v1/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req: RequestType): Promise<StudentEntity[]> {
    return this.studentsService.findAll(req.user.dojoId);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async search(
    @Request() req: RequestType,
    @Query('name') name: string,
  ): Promise<StudentEntity[]> {
    return this.studentsService.search(req.user.dojoId, { name });
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findById(
    @Request() req: RequestType,
    @Param('id') id: string,
  ): Promise<StudentEntity> {
    return this.studentsService.findById(req.user.dojoId, id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: StudentResponse })
  async create(@Request() req: RequestType, @Body() student: StudentRequest) {
    return this.studentsService.create(req.user.dojoId, student);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() req: RequestType,
    @Param('id') id: string,
    @Body() student: StudentRequest,
  ) {
    return this.studentsService.update(req.user.dojoId, id, student);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req: RequestType, @Param('id') id: string) {
    return this.studentsService.delete(req.user.dojoId, id);
  }
}
