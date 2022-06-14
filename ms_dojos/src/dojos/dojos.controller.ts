import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
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
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DojoResponse } from 'src/dto/response/dojo.dto.response';
import { DojoRequest } from '../dto/request/dojo.dto.request';
import { DojosService } from './dojos.service';
import { ClassEntity } from '@commons/entities/classes/class.entity';
import { ClassesService } from './classes/classes.service';
import { ClassRequest } from 'src/dto/request/class.dto.request';
import { PresencesService } from './presences/presences.service';
import { PresenceEntity } from '@commons/entities/presences/presence.entity';
import { PresenceRequest } from 'src/dto/request/presence.dto.request';
import { AuthGuard } from '@nestjs/passport';
import { RequestType } from '@commons/types/RequestType';
import { checkDojoIdPermission } from 'src/utils';
import { RESOURCE_NOT_ALLOWED_MESSAGE } from '@commons/consts';

@ApiTags('Dojos')
@Controller('/v1/dojos')
export class DojosController {
  constructor(
    private readonly dojosService: DojosService,
    private readonly classesService: ClassesService,
    private readonly presencesService: PresencesService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req: RequestType): Promise<DojoEntity[]> {
    if (req.user.dojoId !== 'all') {
      throw new HttpException(
        RESOURCE_NOT_ALLOWED_MESSAGE,
        HttpStatus.FORBIDDEN,
      );
    }
    return this.dojosService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findById(
    @Request() req: RequestType,
    @Param('id') dojoId: string,
  ): Promise<DojoEntity> {
    checkDojoIdPermission(req.user, dojoId);

    return this.dojosService.findById(dojoId);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: DojoResponse })
  async create(@Body() dojo: DojoRequest) {
    return this.dojosService.create(dojo);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() req: RequestType,
    @Param('id') dojoId: string,
    @Body() dojo: DojoRequest,
  ) {
    checkDojoIdPermission(req.user, dojoId);
    return this.dojosService.update(dojoId, dojo);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req: RequestType, @Param('id') dojoId: string) {
    checkDojoIdPermission(req.user, dojoId);
    return this.dojosService.delete(dojoId);
  }

  @Post('/:id/logo')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req: RequestType,
    @Param('id') dojoId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    checkDojoIdPermission(req.user, dojoId);
    await this.dojosService.uploadLogo(dojoId, file);
    return this.dojosService.findById(dojoId);
  }

  // CLASSES
  @Get('/:dojoId/classes')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAllClasses(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
  ): Promise<ClassEntity[]> {
    return this.classesService.findAll(dojoId);
  }

  @Post('/:dojoId/classes')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async createClass(
    @Request() req: RequestType,
    @Body() request: ClassRequest,
    @Param('dojoId') dojoId: string,
  ): Promise<ClassEntity> {
    checkDojoIdPermission(req.user, dojoId);
    return this.classesService.create(request);
  }

  @Get('/:dojoId/classes/:classId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findClassById(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
  ): Promise<ClassEntity> {
    checkDojoIdPermission(req.user, dojoId);
    return this.classesService.findById(dojoId, classId);
  }

  @Put('/:dojoId/classes/:classId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async updateClass(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
    @Body() request: ClassRequest,
  ): Promise<ClassEntity> {
    checkDojoIdPermission(req.user, dojoId);
    return this.classesService.update(dojoId, classId, request);
  }

  @Delete('/:dojoId/classes/:classId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async disableClass(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
  ): Promise<void> {
    checkDojoIdPermission(req.user, dojoId);
    await this.classesService.delete(dojoId, classId);
  }

  // PRESENÇAS
  @Get('/:dojoId/classes/:classId/presences')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAllPresences(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
  ): Promise<PresenceEntity[]> {
    checkDojoIdPermission(req.user, dojoId);
    return this.presencesService.findAll(dojoId, classId);
  }

  @Post('/:dojoId/classes/:classId/presences')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async createPresence(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
    @Body() request: PresenceRequest,
  ): Promise<PresenceEntity> {
    checkDojoIdPermission(req.user, dojoId);
    return this.presencesService.create(classId, request);
  }

  @Get('/:dojoId/classes/:classId/presences/:presenceId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findPresenceById(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
    @Param('presenceId') presenceId: string,
  ): Promise<PresenceEntity> {
    checkDojoIdPermission(req.user, dojoId);
    return this.presencesService.findById(dojoId, classId, presenceId);
  }

  @Put('/:dojoId/classes/:classId/presences/presenceId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async updatePresence(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
    @Param('presenceId') presenceId: string,
    @Body() request: PresenceRequest,
  ): Promise<PresenceEntity> {
    checkDojoIdPermission(req.user, dojoId);
    return this.presencesService.update(classId, presenceId, request);
  }

  @Delete('/:dojoId/classes/:classId/presences/:presenceId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async disablePresence(
    @Request() req: RequestType,
    @Param('dojoId') dojoId: string,
    @Param('classId') classId: string,
    @Param('presenceId') presenceId: string,
  ): Promise<void> {
    checkDojoIdPermission(req.user, dojoId);
    await this.presencesService.delete(classId, presenceId);
  }
}
