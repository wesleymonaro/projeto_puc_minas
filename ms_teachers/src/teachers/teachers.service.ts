import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { DojoSearchParams } from '@commons/types/Dojo';
import { TeacherRequest } from 'src/dto/request/teacher.dto.request';
import { ROLE_DOJO_ADMIN, ROLE_TEACHER } from '@commons/consts';
import { UserEntity } from '@commons/entities/users/user.entity';
import { TeacherEntity } from '@commons/entities/teachers/teachers.entity';
import { dojosMS, domainsMS } from '@commons/helpers/http';
import { createUserInCognito } from '@commons/helpers/cognito';
import { BeltEntity } from '@commons/entities/belt/belt.entity';
import { BeltDegreeColorEntity } from '@commons/entities/belt_degree_color/belt_degree_color.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teachersRepository: Repository<TeacherEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(dojoId: string): Promise<TeacherEntity[]> {
    if (dojoId === 'all') {
      return this.teachersRepository.find({ active: true });
    }

    const dojo = await this.checkDojoById(dojoId);

    return this.teachersRepository.find({ dojo, active: true });
  }

  async findById(id: string): Promise<TeacherEntity> {
    return this.teachersRepository.findOne(id, {
      relations: ['belt'],
    });
  }

  async create(
    dojoId: string,
    request: TeacherRequest,
  ): Promise<TeacherEntity> {
    const dojo = await this.checkDojoById(request.dojoId);

    const belt = await this.checkBeltById(request.beltId);

    const beltDegreeColor = await this.checkBeltDegreeColorById(
      request.beltDegreeColorId,
    );

    const userCreated = await this.usersRepository.save({
      name: request.name,
      email: '',
      dojo: dojo,
      role: ROLE_DOJO_ADMIN,
    });

    const created = await this.teachersRepository.save({
      dojo: dojo,
      belt: belt,
      beltDegreeColor: beltDegreeColor,
      name: request.name,
      user: userCreated,
    });

    await createUserInCognito({
      username: String(userCreated.id),
      password: request.password,
      dojoId: String(dojo.id),
      name: request.name,
      role: ROLE_TEACHER,
      email: '',
    });

    return created;
  }

  async update(id: string, request: TeacherRequest): Promise<TeacherEntity> {
    const teacher = await this.teachersRepository.findOne(id);

    const belt = await this.checkBeltById(request.beltId);

    const beltDegreeColor = await this.checkBeltDegreeColorById(
      request.beltDegreeColorId,
    );

    teacher.name = request.name;
    teacher.belt = belt;
    teacher.beltDegreeColor = beltDegreeColor;

    await this.teachersRepository.save(teacher);

    return this.teachersRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const teacher = await this.teachersRepository.findOne(id);
    teacher.active = false;
    await this.teachersRepository.save(teacher);
  }

  async search(dojoId: string, params: any): Promise<TeacherEntity[]> {
    if (dojoId === 'all') {
      return this.teachersRepository.find({
        where: {
          name: ILike(`%${params.name}%`),
          active: true,
        },
      });
    }
    const dojo = await this.checkDojoById(dojoId);

    return this.teachersRepository.find({
      where: {
        dojo: dojo,
        name: ILike(`%${params.name}%`),
        active: true,
      },
    });
  }

  private checkDojoById = async (dojoId: string): Promise<DojoEntity> => {
    const { data: dojo } = await dojosMS.get<DojoEntity>(`/dojos/${dojoId}`);
    if (!dojo) {
      throw new HttpException('Dojo not exists', HttpStatus.BAD_REQUEST);
    }
    return dojo;
  };

  private checkBeltById = async (beltId: string): Promise<BeltEntity> => {
    const { data: belt } = await domainsMS(`/belts/${beltId}`);
    if (!belt) {
      throw new HttpException('Belt not exists', HttpStatus.BAD_REQUEST);
    }
    return belt;
  };

  private checkBeltDegreeColorById = async (
    beltDegreeColorId: string,
  ): Promise<BeltDegreeColorEntity> => {
    const { data: beltDegreeColor } = await domainsMS(
      `/beltDegrees/${beltDegreeColorId}`,
    );
    if (!beltDegreeColor) {
      throw new HttpException('BeltDegree not exists', HttpStatus.BAD_REQUEST);
    }
    return beltDegreeColor;
  };
}
