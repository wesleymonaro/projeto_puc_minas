import axios, { AxiosResponse } from "axios";
import { BeltDegreeDTO } from "src/dto/belt-degree.response.dto";
import { BeltDTO } from "src/dto/belt.response.dto";
import { StudentRequestDTO } from "src/dto/student.request.dto";
import { StudentResponseDTO } from "src/dto/student.response.dto";
import { TeacherRequestDTO } from "src/dto/teacher.request.dto";
import { TeacherResponseDTO } from "src/dto/teacher.response.dto";
import { ViaCepResponseDTO } from "src/dto/viacep.response.dto";
import { studentsApi, domainsApi, teachersApi } from "./api";

export const getAddressFromZip = (
  zip: string
): Promise<AxiosResponse<ViaCepResponseDTO>> =>
  axios.get<ViaCepResponseDTO>(`https://viacep.com.br/ws/${zip}/json/`);

export const loadStudents = (): Promise<AxiosResponse<StudentResponseDTO[]>> =>
  studentsApi.get<StudentResponseDTO[]>("students");

export const loadStudentById = (
  id: number
): Promise<AxiosResponse<StudentResponseDTO>> =>
  studentsApi.get<StudentResponseDTO>(`students/${id}`);

export const deleteStudentById = (id: number): Promise<AxiosResponse<void>> =>
  studentsApi.delete<void>(`students/${id}`);

export const createStudent = (
  payload: StudentRequestDTO
): Promise<AxiosResponse<StudentResponseDTO>> =>
  studentsApi.post<StudentResponseDTO>(`students`, payload);

export const updateStudent = (
  id: number,
  payload: StudentRequestDTO
): Promise<AxiosResponse<StudentResponseDTO>> =>
  studentsApi.put<StudentResponseDTO>(`students/${id}`, payload);

export const loadBelts = (): Promise<AxiosResponse<BeltDTO[]>> =>
  domainsApi.get<BeltDTO[]>("belts");

export const loadBeltDegrees = (): Promise<AxiosResponse<BeltDegreeDTO[]>> =>
  domainsApi.get<BeltDegreeDTO[]>("beltDegrees");

export const loadTeachers = (): Promise<AxiosResponse<TeacherResponseDTO[]>> =>
  teachersApi.get<TeacherResponseDTO[]>("teachers");

export const loadTeacherById = (
  id: number
): Promise<AxiosResponse<TeacherResponseDTO>> =>
  teachersApi.get<TeacherResponseDTO>(`teachers/${id}`);

export const deleteTeacherById = (id: number): Promise<AxiosResponse<void>> =>
  teachersApi.delete<void>(`teachers/${id}`);

export const createTeacher = (
  payload: TeacherRequestDTO
): Promise<AxiosResponse<TeacherResponseDTO>> =>
  teachersApi.post<TeacherResponseDTO>(`teachers`, payload);

export const updateTeacher = (
  id: number,
  payload: TeacherRequestDTO
): Promise<AxiosResponse<TeacherResponseDTO>> =>
  teachersApi.put<TeacherResponseDTO>(`teachers/${id}`, payload);

// CLASSES
// export const loadTeachers = (): Promise<AxiosResponse<TeacherResponseDTO[]>> =>
//   teachersApi.get<TeacherResponseDTO[]>("teachers");

// export const loadTeacherById = (
//   id: number
// ): Promise<AxiosResponse<TeacherResponseDTO>> =>
//   teachersApi.get<TeacherResponseDTO>(`teachers/${id}`);

// export const deleteTeacherById = (id: number): Promise<AxiosResponse<void>> =>
//   teachersApi.delete<void>(`teachers/${id}`);

// export const createTeacher = (
//   payload: TeacherRequestDTO
// ): Promise<AxiosResponse<TeacherResponseDTO>> =>
//   teachersApi.post<TeacherResponseDTO>(`teachers`, payload);

// export const updateTeacher = (
//   id: number,
//   payload: TeacherRequestDTO
// ): Promise<AxiosResponse<TeacherResponseDTO>> =>
//   teachersApi.put<TeacherResponseDTO>(`teachers/${id}`, payload);
