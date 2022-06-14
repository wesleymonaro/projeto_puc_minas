import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { DojoSearchParams } from '@commons/types/Dojo';

import { ClassEntity } from '@commons/entities/classes/class.entity';
import { PresenceEntity } from '@commons/entities/presences/presence.entity';
import { PresenceRequest } from 'src/dto/request/presence.dto.request';
import { StudentEntity } from '@commons/entities/students/students.entity';
import { studentsMS } from '@commons/helpers/http';

@Injectable()
export class PresencesService {
  constructor(
    @InjectRepository(DojoEntity)
    private dojoRepository: Repository<DojoEntity>,
    @InjectRepository(ClassEntity)
    private classesRepository: Repository<ClassEntity>,
    @InjectRepository(PresenceEntity)
    private presencesRepository: Repository<PresenceEntity>,
  ) {}

  async findAll(dojoId: string, classId: string): Promise<PresenceEntity[]> {
    const dojo = await this.checkDojoById(dojoId);

    const _class = await this.checkClassById(classId);

    return this.presencesRepository.find({
      dojo: dojo,
      class: _class,
    });
  }

  async findById(
    dojoId: string,
    classId: string,
    presenceId: string,
  ): Promise<PresenceEntity> {
    const dojo = await this.checkDojoById(dojoId);

    const _class = await this.checkClassById(classId);

    const data = await this.presencesRepository.findOne(presenceId, {
      relations: ['student', 'class'],
    });

    return data;
  }

  async create(
    classId: string,
    request: PresenceRequest,
  ): Promise<PresenceEntity> {
    const dojo = await this.checkDojoById(request.dojoId);

    const _class = await this.checkClassById(classId);

    const student = await this.checkStutentById(request.studentId);

    const presenceCreated = await this.presencesRepository.save({
      dojo: dojo,
      class: _class,
      date: request.date,
      student: student,
      confirmedByUser: null,
    });

    return presenceCreated;
  }

  async update(
    classId: string,
    presenceId: string,
    request: PresenceRequest,
  ): Promise<PresenceEntity> {
    await this.checkClassById(classId);

    const presence = await this.checkPresenceById(presenceId);

    presence.date = request.date;
    presence.status = request.status;

    await this.presencesRepository.update(presence.id, presence);

    return this.presencesRepository.findOne(presenceId);
  }

  async delete(classId: string, presenceId: string): Promise<void> {
    await this.checkClassById(classId);

    const presence = await this.checkPresenceById(presenceId);

    presence.status = 0;

    await this.presencesRepository.update(presence.id, presence);
  }

  async search(searchParams: DojoSearchParams): Promise</*Dojo[]*/ void> {
    // const query = { active: true };
    // if (searchParams.city) {
    //   query['address.city'] = new RegExp(searchParams.city, 'i');
    // }
    // if (searchParams.state) {
    //   query['address.state'] = new RegExp(searchParams.state, 'i');
    // }
    // return this.dojoRepository.find(query);
  }

  private checkDojoById = async (dojoId: string): Promise<DojoEntity> => {
    const dojo = await this.dojoRepository.findOne(dojoId);
    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }
    return dojo;
  };

  private checkClassById = async (classId: string): Promise<ClassEntity> => {
    const _class = await this.classesRepository.findOne(classId);
    if (!_class) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }
    return _class;
  };

  private checkPresenceById = async (
    presenceId: string,
  ): Promise<PresenceEntity> => {
    const presence = await this.presencesRepository.findOne(presenceId);
    if (!presence) {
      throw new HttpException('Presence not found', HttpStatus.NOT_FOUND);
    }
    return presence;
  };

  private checkStutentById = async (
    studentId: string,
  ): Promise<StudentEntity> => {
    const { data: student } = await studentsMS.get<StudentEntity>(
      `/students/${studentId}`,
    );
    if (!student) {
      throw new HttpException('Student not exists', HttpStatus.BAD_REQUEST);
    }
    return student;
  };
}
