import { createEvent, split } from 'effector';
import { login, register } from 'entities/viewer';
import { AuthDto } from 'shared/types';

type IPayload = { type: 'login' | 'register'; data: AuthDto };

export const auth = createEvent<IPayload>();

split({
  source: auth,
  match: {
    login: ({ type }) => type === 'login',
    register: ({ type }) => type === 'register',
  },
  cases: {
    login: login.prepend<IPayload>((payload) => payload.data),
    register: register.prepend<IPayload>((payload) => payload.data),
  },
});
