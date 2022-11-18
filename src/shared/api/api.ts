import {
  ICreateDonationDto,
  IDonation,
  IHospital,
  ILoginUserDto,
  IPatient,
  IPatientInfo,
  IRegisterPatientDto,
  IRegisterUserDto,
  IUser,
} from 'shared/types';

import { http } from './http';

export async function fetchMe(token: string) {
  const res = await http.post<{ user: IUser }>('auth/me', { token });
  return res.data;
}

export async function loginUser(data: ILoginUserDto) {
  const res = await http.post<{ user: IUser; token: string }>('auth/login', data);
  return res.data;
}

export async function registerUser(data: IRegisterUserDto) {
  const res = await http.post<{ user: IUser; token: string }>('auth/register', data);
  return res.data;
}

export async function registerDoctor(data: IRegisterUserDto) {
  const res = await http.post<{ user: IUser; token: string }>('auth/register-doctor', data);
  return res.data;
}

export async function registerPatient(data: IRegisterPatientDto) {
  const res = await http.post<{ user: IPatient; token: string }>('auth/register-patient', data);
  return res.data;
}

export async function fetchAllHospitals() {
  const res = await http.get<IHospital[]>('hospitals');
  return res.data;
}

export async function makeDonation(data: ICreateDonationDto) {
  const res = await http.post<IDonation>('donations/make', data);
  return res.data;
}

export async function fetchUserDonations(userId: number) {
  const res = await http.get<IDonation[]>(`donations/${userId}`, {
    data: {
      userId,
    },
  });
  return res.data;
}

export async function fetchDoctors() {
  const res = await http.get<IUser[]>('users/doctors');
  return res.data;
}

export async function fetchAllPatients() {
  const res = await http.get<IPatient[]>('patients');
  return res.data;
}

export async function fetchPatientInfo(patientId: number) {
  const res = await http.get<IPatientInfo>(`patients/${patientId}`);
  return res.data;
}
