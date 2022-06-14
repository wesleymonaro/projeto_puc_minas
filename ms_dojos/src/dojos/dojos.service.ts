import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { uploadFile } from 'src/utils/uploads3';
import { Repository } from 'typeorm';
import { AddressEntity } from '@commons/entities/address/address.entity';
import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { DojoSearchParams } from '@commons/types/Dojo';

import { DojoRequest } from '../dto/request/dojo.dto.request';
import { IDojoService } from './dojo.service.i';
import { UserEntity } from '@commons/entities/users/user.entity';
import { ROLE_DOJO_ADMIN } from '@commons/consts';
import { createUserInCognito } from '@commons/helpers/cognito';

@Injectable()
export class DojosService implements IDojoService {
  constructor(
    @InjectRepository(DojoEntity)
    private dojoRepository: Repository<DojoEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<DojoEntity[]> {
    return this.dojoRepository.find({ active: true });
  }

  async findById(id: string): Promise<DojoEntity> {
    return this.dojoRepository.findOne(id, {
      relations: ['address'],
    });
  }

  async create(request: DojoRequest): Promise<DojoEntity> {
    if (
      await this.dojoRepository.findOne({ cnpj: request.cnpj, active: true })
    ) {
      throw new HttpException('CNPJ already exists', HttpStatus.BAD_REQUEST);
    }

    const createdAddress = await this.addressRepository.save(request.address);

    const dojoCreated = await this.dojoRepository.save({
      ...request,
      name: request.dojoName,
      address: createdAddress,
    });

    const userCreated = await this.usersRepository.save({
      name: request.personName,
      dojo: dojoCreated,
      email: request.email,
      role: 'dojo_admin',
    });

    await createUserInCognito({
      username: String(userCreated.id),
      password: request.password,
      dojoId: String(dojoCreated.id),
      email: request.email,
      name: request.personName,
      role: ROLE_DOJO_ADMIN,
    });

    return dojoCreated;
  }

  async update(id: string, data: DojoRequest): Promise<DojoEntity> {
    const dojo = await this.dojoRepository.findOne(id, {
      relations: ['address'],
    });

    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    if (data.address) {
      const address = await this.addressRepository.findOne(dojo.address.id);
      address.street = data.address.street;
      address.number = data.address.number;
      address.neighborhood = data.address.neighborhood;
      address.complement = data.address.complement;
      address.city = data.address.city;
      address.state = data.address.state;
      address.zip = data.address.zip;
      await this.addressRepository.update(address.id, address);
    }

    dojo.email = data.email;
    dojo.name = data.dojoName;
    dojo.phone = data.phone;

    // const coordinates = await getGeoFromAddress(
    //   transformAddressToString(data.address),
    // );

    // dojo.geo = {
    //   coordinates: [coordinates.lat, coordinates.lng],
    //   type: 'Point',
    // };

    await this.dojoRepository.update(dojo.id, dojo);

    return this.dojoRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    this.dojoRepository.delete(id);
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

  async uploadLogo(
    dojoId: string,
    { buffer, mimetype }: Express.Multer.File,
  ): Promise<any> {
    const dojo = await this.dojoRepository.findOne(dojoId);

    if (!dojo) {
      throw new HttpException('Dojo not found', HttpStatus.NOT_FOUND);
    }

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      throw new HttpException('Only images allowed', HttpStatus.NOT_FOUND);
    }

    const response = await uploadFile(
      `${dojoId}.${mimetype === 'image/jpeg' ? 'jpg' : 'png'}`,
      buffer,
      mimetype,
    );

    dojo.logo = response;

    await this.dojoRepository.update(dojoId, dojo);

    return response;
  }
}
