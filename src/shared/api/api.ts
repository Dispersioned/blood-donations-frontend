import { IUser } from 'shared/types';

import { http } from './http';

export async function fetchMe(token: string) {
  const res = await http.post<{ user: IUser }>('/auth/me', { token });
  return res.data;
}

export async function loginUser(username: string, password: string) {
  const res = await http.post<{ user: IUser; token: string }>('/auth/login', {
    username,
    password,
  });
  return res.data;
}
