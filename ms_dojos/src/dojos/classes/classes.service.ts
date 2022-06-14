import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { DojoSearchParams } from '@commons/types/Dojo';

import { ClassEntity } from '@commons/entities/classes/class.entity';
import { ClassRequest } from 'src/dto/request/class.dto.request';
import { TeacherEntity } from '@commons/entities/teachers/teachers.entity';
import { teachersMS } from '@commons/helpers/http';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(DojoEntity)
    private dojoRepository: Repository<DojoEntity>,
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
  ) {}

  async findAll(dojoId: string): Promise<ClassEntity[]> {
    const dojo = await this.dojoRepository.findOne(dojoId);
    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    return this.classesRepository.find({ active: true, dojo: dojo });
  }

  async findById(dojoId: string, classId: string): Promise<ClassEntity> {
    const dojo = await this.dojoRepository.findOne(dojoId);
    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    const data = await this.classesRepository.findOne(classId, {
      relations: ['dojo', 'teacher'],
    });

    if (!data.active) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async create(request: ClassRequest): Promise<ClassEntity> {
    const dojo = await this.dojoRepository.findOne(request.dojoId);
    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    const { data: teacher } = await teachersMS.get<TeacherEntity>(
      `/teachers/${request.teacherId}`,
    );
    if (!teacher) {
      throw new HttpException('Teacher not exists', HttpStatus.BAD_REQUEST);
    }

    const classCreated = await this.classesRepository.save({
      dojo: dojo,
      teacher: teacher,
      name: request.name,
      category: request.category,
      endHour: request.endHour,
      initHour: request.initHour,
      maxStudents: Number(request.maxStudents),
    });

    return classCreated;
  }

  async update(
    dojoId: string,
    classId: string,
    request: ClassRequest,
  ): Promise<ClassEntity> {
    const dojo = await this.dojoRepository.findOne(dojoId);

    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    const data = await this.classesRepository.findOne(classId);

    data.category = request.category;
    data.endHour = request.endHour;
    data.initHour = request.initHour;
    data.maxStudents = Number(request.maxStudents);
    data.name = request.name;

    await this.classesRepository.update(data.id, data);

    return this.classesRepository.findOne(classId);
  }

  async delete(dojoId: string, id: string): Promise<void> {
    const dojo = await this.dojoRepository.findOne(dojoId);
    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    const data = await this.classesRepository.findOne(id);
    data.active = false;
    await this.classesRepository.save(data);
  }

  async search(searchParams: DojoSearchParams): Promise</*Dojo[]*/ void> {
    const query = { active: true };

    if (searchParams.city) {
      query['address.city'] = new RegExp(searchParams.city, 'i');
    }

    if (searchParams.state) {
      query['address.state'] = new RegExp(searchParams.state, 'i');
    }

    // return this.dojoRepository.find(query);
  }
}
