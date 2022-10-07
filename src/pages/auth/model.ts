import { createEvent, split } from 'effector';
import { login, register } from 'entities/viewer';
import { AuthDto } from 'shared/types';

export type IAuthPayload = { type: 'login' | 'register'; data: AuthDto };

export const auth = createEvent<IAuthPayload>();

split({
  source: auth,
  match: {
    login: ({ type }) => type === 'login',
    register: ({ type }) => type === 'register',
  },
  cases: {
    login: login.prepend<IAuthPayload>((payload) => payload.data),
    register: register.prepend<IAuthPayload>((payload) => payload.data),
  },
});
