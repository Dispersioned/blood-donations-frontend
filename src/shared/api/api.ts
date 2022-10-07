import { IUser } from 'shared/types';

import { http } from './http';

export async function fetchMe(token: string) {
  const user = await http.post<{ user: IUser; token: string }>('/me', { token });
  return user.data;
}

export async function loginUser(username: string, password: string) {
  console.log('lets await');
  const user = await http.post<{ user: IUser; token: string }>('/auth/login', {
    username,
    password,
  });
  console.log(user);
  return user.data;
}
