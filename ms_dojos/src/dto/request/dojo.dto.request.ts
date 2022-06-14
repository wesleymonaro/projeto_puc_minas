import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@commons/types/Address';

export class DojoRequest {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  personName: string;

  @ApiProperty()
  dojoName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: Address;
}
