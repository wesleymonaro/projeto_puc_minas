import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@commons/types/Address';

export class StudentRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthdate: string;

  @ApiProperty()
  paymentDate: string;

  @ApiProperty()
  observations: string;

  @ApiProperty()
  notifyDueDate: boolean;

  @ApiProperty()
  startsFightAt: string;

  @ApiProperty()
  beltId: string;

  @ApiProperty()
  beltDegreeColorId: string;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  dojoId: string;

  @ApiProperty()
  planId: string;
}
