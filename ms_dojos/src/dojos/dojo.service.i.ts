import { DojoEntity } from '@commons/entities/dojos/dojos.entity';
import { DojoSearchParams } from '@commons/types/Dojo';
import { DojoRequest } from 'src/dto/request/dojo.dto.request';

export interface IDojoService {
  findAll(): Promise<DojoEntity[]>;
  findById(id: string): Promise<DojoEntity>;
  create(request: DojoRequest): Promise<DojoEntity>;
  update(id: string, data: DojoRequest): Promise<DojoEntity>;
  delete(id: string): Promise<void>;
  search(searchParams: DojoSearchParams): Promise</*Dojo[]*/ void>;
  uploadLogo(dojoId: string, file: Express.Multer.File): Promise<any>;
}
