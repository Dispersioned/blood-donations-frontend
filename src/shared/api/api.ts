import { AxiosResponse } from 'axios';
import {
  IConfirmRequestDto,
  ICreateDonationDto,
  ICreateHospitalDto,
  ICreateRequestDto,
  IDeleteHospitalDto,
  IDeleteUserDto,
  IDonation,
  IHospital,
  ILoginUserDto,
  IPatient,
  IRegisterPatientDto,
  IRegisterUserDto,
  IRequest,
  IRequestWithInfo,
  IUpdateDoctorDto,
  IUpdateHospitalDto,
  IUpdatePatientDto,
  IUser,
} from 'shared/types';

import { http } from './http';

const Partial = <T>(data: T) => data as T | null;

async function $errorHandler<T extends AxiosResponse>(promise: Promise<T>) {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    return null;
  }
}

export async function fetchMe(token: string) {
  const res = await $errorHandler(http.post<{ user: IUser }>('auth/me', { token }));
  return res;
}

export async function loginUser(data: ILoginUserDto) {
  const res = await http.post<{ user: IUser; token: string }>('auth/login', data);
  return Partial(res.data);
}

export async function registerUser(data: IRegisterUserDto) {
  const res = await http.post<{ user: IUser; token: string }>('auth/register', data);
  return Partial(res.data);
}

export async function registerDoctor(data: IRegisterUserDto) {
  const res = await http.post<{ user: IUser; token: string }>('auth/register-doctor', data);
  return Partial(res.data);
}

export async function registerPatient(data: IRegisterPatientDto) {
  const res = await http.post<{ user: IPatient; token: string }>('auth/register-patient', data);
  return Partial(res.data);
}

export async function updatePatient(data: IUpdatePatientDto) {
  const res = await http.put('patients', data);
  return Partial(res.data);
}

export async function updateDoctor(data: IUpdateDoctorDto) {
  const res = await http.put('users/doctor', data);
  return Partial(res.data);
}

export async function fetchAllHospitals() {
  const res = await http.get<IHospital[]>('hospitals');
  return Partial(res.data);
}

export async function makeDonation(data: ICreateDonationDto) {
  const res = await http.post<IDonation>('donations/make', data);
  return Partial(res.data);
}

export async function fetchUserDonations(userId: number) {
  const res = await http.get<IDonation[]>(`donations/${userId}`, {
    data: {
      userId,
    },
  });
  return Partial(res.data);
}

export async function fetchDoctors() {
  const res = await http.get<IUser[]>('users/doctors');
  return Partial(res.data);
}

export async function fetchAllPatients() {
  const res = await http.get<IPatient[]>('patients');
  return Partial(res.data);
}

export async function fetchAllRequests() {
  const res = await http.get<IRequestWithInfo[]>('requests');
  return Partial(res.data);
}

export async function fetchPatientInfo(patientId: number) {
  const res = await http.get<IPatient>(`patients/${patientId}`);
  return Partial(res.data);
}

export async function makeDonationRequest(data: ICreateRequestDto) {
  const res = await http.post<IRequest>('requests', data);
  return Partial(res.data);
}

export async function confirmRequest(data: IConfirmRequestDto) {
  const res = await http.post<IRequest>('request-confirmer', data);
  return Partial(res.data);
}

export async function createHospital(data: ICreateHospitalDto) {
  const res = await http.post<IHospital>('hospitals', data);
  return Partial(res.data);
}

export async function updateHospital(data: IUpdateHospitalDto) {
  const res = await http.put<IHospital>('hospitals', data);
  return Partial(res.data);
}

export async function deleteHospital(data: IDeleteHospitalDto) {
  const res = await http.delete<IHospital>('hospitals', { data });
  return Partial(res.data);
}

export async function deleteDoctor(data: IDeleteUserDto) {
  const res = await http.delete<{ deleted: boolean }>('user-delete/doctor', { data });
  return Partial(res.data);
}

export async function deletePatient(data: IDeleteUserDto) {
  const res = await http.delete<{ deleted: boolean }>('user-delete/patient', { data });
  return Partial(res.data);
}
