import { createEvent, sample } from 'effector';
import { viewerModel } from 'entities/viewer';
import { ILoginUserDto, IRegisterUserDto } from 'shared/types';

export const login = createEvent<ILoginUserDto>();
export const register = createEvent<IRegisterUserDto>();

sample({
  clock: login,
  target: viewerModel.login,
});
sample({
  clock: register,
  target: viewerModel.register,
});
