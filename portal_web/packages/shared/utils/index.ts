// @ts-ignore
import { Address } from "@commons/types/Address";

export const renderRole = (role: string): string => {
  if (role === "student") return "Estudante";
  if (role === "teacher") return "Instrutor";
  return "Administrador";
};

export const getFirstLettersFromName = (name: string): string => {
  return name[0];
};

export const renderFullAddress = (address: Address | undefined): string => {
  if (!address) return "";

  const {
    city,
    neighborhood,
    number,
    state,
    street,
    zip,
    complement,
  } = address;

  const complementInfo = `${complement},` || "";

  return `${street}, ${number}, ${complementInfo} ${neighborhood}, ${city}, ${state}, ${zip}`;
};
