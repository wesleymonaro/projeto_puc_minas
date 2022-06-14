// @ts-ignore
import { Address } from "../../@commons/types/Address";
import { BeltDegreeDTO } from "./belt-degree.response.dto";
import { BeltDTO } from "./belt.response.dto";

export interface TeacherResponseDTO {
  id: number;
  active: boolean;
  birthdate: string;
  cpf: string;
  createdAt: string;
  email: string;
  name: string;
  notifyDueDate: boolean;
  observations: string;
  paymentDate: string;
  phone: string;
  photo: string;
  planId: number;
  startsFightAt: string;
  updatedAt: string;
  belt?: BeltDTO;
  beltDegreeColor?: BeltDegreeDTO;
  address?: Address;
}
