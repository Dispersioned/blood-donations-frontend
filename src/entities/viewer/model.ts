import { createEffect, createEvent, sample } from 'effector';
import { loginUser } from 'shared/api';
import { AuthDto } from 'shared/types';

export const login = createEvent<AuthDto>();
export const register = createEvent<AuthDto>();

const loginFx = createEffect(async (data: AuthDto) => {
  const { user, token } = await loginUser(data.login, data.password);
  localStorage.setItem('token', token);
  return user;
});

sample({
  clock: login,
  target: loginFx,
});

// login.watch(console.log);
