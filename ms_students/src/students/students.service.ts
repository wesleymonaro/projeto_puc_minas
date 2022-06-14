import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { StudentRequest } from 'src/dto/request/student.dto.request';
import { ILike, Like, Repository } from 'typeorm';
import { AddressEntity } from '@commons/entities/address/address.entity';
import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { DojoSearchParams } from '@commons/types/Dojo';
import {
  EVENT_STUDENT_CREATED,
  RESOURCE_NOT_ALLOWED_MESSAGE,
  ROLE_STUDENT,
} from '@commons/consts';
import { UserEntity } from '@commons/entities/users/user.entity';
import { StudentEntity } from '@commons/entities/students/students.entity';
import { BeltEntity } from '@commons/entities/belt/belt.entity';
import { BeltDegreeColorEntity } from '@commons/entities/belt_degree_color/belt_degree_color.entity';
import {
  AuthCognitoRequest,
  createUserInCognito,
} from '@commons/helpers/cognito';
import { dojosMS, domainsMS } from '@commons/helpers/http';
import { ClientProxy } from '@nestjs/microservices';
import { encrypt } from '@commons/helpers/bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('MESSAGES_SERVICE') private client: ClientProxy,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(dojoId: string): Promise<StudentEntity[]> {
    if (dojoId === 'all') {
      return this.studentsRepository.find();
    }

    const dojo = await this.checkDojoById(dojoId);

    return this.studentsRepository.find({
      where: {
        dojo,
        active: true,
      },
      relations: ['belt', 'beltDegreeColor'],
    });
  }

  async findById(dojoId: string, id: string): Promise<StudentEntity> {
    if (dojoId === 'all') {
      return this.studentsRepository.findOne(id, {
        relations: ['address', 'belt', 'beltDegreeColor'],
      });
    }
    const dojo = await this.checkDojoById(dojoId);

    const student = await this.studentsRepository.find({
      where: {
        id: id,
        dojo: dojo,
      },
      relations: ['address', 'belt', 'beltDegreeColor'],
      take: 1,
    });

    if (student.length === 0) {
      throw new HttpException('Student not exists', HttpStatus.BAD_REQUEST);
    }

    return student[0];
  }

  async create(
    dojoId: string,
    request: StudentRequest,
  ): Promise<StudentEntity> {
    if (dojoId !== 'all' && dojoId !== request.dojoId) {
      throw new HttpException(
        RESOURCE_NOT_ALLOWED_MESSAGE,
        HttpStatus.FORBIDDEN,
      );
    }
    const dojo = await this.checkDojoById(request.dojoId);

    if (
      await this.studentsRepository.findOne({ cpf: request.cpf, dojo: dojo })
    ) {
      throw new HttpException('CPF already exists', HttpStatus.BAD_REQUEST);
    }

    const belt = await this.checkBeltById(request.beltId);

    const beltDegreeColor = await this.checkBeltDegreeColorById(
      request.beltDegreeColorId,
    );

    const createdAddress = await this.addressRepository.save(request.address);

    const userCreated = await this.usersRepository.save({
      name: request.name,
      email: request.email,
      dojo: dojo,
      role: ROLE_STUDENT,
    });

    const studentCreated = await this.studentsRepository.save({
      ...request,
      dojo: dojo,
      belt: belt,
      beltDegreeColor: beltDegreeColor,
      address: createdAddress,
      user: userCreated,
    });

    this.client.emit<string, AuthCognitoRequest>(EVENT_STUDENT_CREATED, {
      username: String(userCreated.id),
      // password: encrypt(request.password),
      password: request.password,
      dojoId: String(dojo.id),
      name: request.name,
      role: ROLE_STUDENT,
      email: request.email,
    });

    return studentCreated;
  }

  async update(
    dojoId: string,
    id: string,
    data: StudentRequest,
  ): Promise<StudentEntity> {
    if (dojoId !== 'all' && dojoId !== data.dojoId) {
      throw new HttpException(
        RESOURCE_NOT_ALLOWED_MESSAGE,
        HttpStatus.FORBIDDEN,
      );
    }

    const student = await this.studentsRepository.findOne(id, {
      relations: ['address'],
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    if (data.address) {
      const address = await this.addressRepository.findOne(student.address.id);
      address.street = data.address.street;
      address.number = data.address.number;
      address.neighborhood = data.address.neighborhood;
      address.complement = data.address.complement;
      address.city = data.address.city;
      address.state = data.address.state;
      address.zip = data.address.zip;
      await this.addressRepository.update(address.id, address);
    }

    student.email = data.email;
    student.name = data.name;
    student.phone = data.phone;

    await this.studentsRepository.update(student.id, student);

    return this.studentsRepository.findOne(id);
  }

  async delete(dojoId: string, id: string): Promise<void> {
    const student = await this.studentsRepository.findOne(id);

    // if (dojoId !== 'all' && dojoId != student.dojo.id) {
    //   throw new HttpException(
    //     RESOURCE_NOT_ALLOWED_MESSAGE,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    student.active = false;

    await this.studentsRepository.update(id, student);
  }

  async search(dojoId: string, params: any): Promise<StudentEntity[]> {
    if (dojoId === 'all') {
      return this.studentsRepository.find({
        where: {
          name: ILike(`%${params.name}%`),
          active: true,
        },
      });
    }
    const dojo = await this.checkDojoById(dojoId);

    return this.studentsRepository.find({
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
