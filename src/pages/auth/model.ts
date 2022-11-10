import { createEvent, split } from 'effector';
import { viewerModel } from 'entities/viewer';
import { ILoginUserDto } from 'shared/types';

export type IAuthPayload = { type: 'login' | 'register'; data: ILoginUserDto };

export const auth = createEvent<IAuthPayload>();

split({
  source: auth,
  match: {
    login: ({ type }) => type === 'login',
    register: ({ type }) => type === 'register',
  },
  cases: {
    login: viewerModel.login.prepend<IAuthPayload>((payload) => payload.data),
    register: viewerModel.register.prepend<IAuthPayload>((payload) => payload.data),
  },
});
