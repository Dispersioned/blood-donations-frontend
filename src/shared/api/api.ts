import { ICreateDonationDto, IHospital, ILoginUserDto, IRegisterUserDto, IUser } from 'shared/types';

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

export async function getAllHospitals() {
  const res = await http.get<IHospital[]>('hospitals');
  return res.data;
}

export async function makeDonation(data: ICreateDonationDto) {
  const res = await http.post<IHospital[]>('donations/make', data);
  return res.data;
}
