import { Address } from "@doar/main/@commons/types/Address";

export interface StudentRequestDTO {
  id?: number;

  name: string;

  email: string;

  phone: string;

  cpf: string;

  password: string;

  birthdate: string;

  paymentDate: string;

  observations: string;

  notifyDueDate: boolean;

  startsFightAt: string;

  beltId: string;

  beltDegreeColorId: string;

  address: Address;

  dojoId: string;

  planId: string;
}
