import { createEvent, sample } from 'effector';
import { viewerModel } from 'entities/viewer';
import { passwordValidatorFactory } from 'shared/factory/passwordValidatorFactory';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { ILoginUserDto, IRegisterEvent } from 'shared/types';

export const login = createEvent<ILoginUserDto>();
export const register = createEvent<IRegisterEvent>();

sample({
  clock: login,
  target: viewerModel.login,
});

const { passwordsEqual } = passwordValidatorFactory(register);

sample({
  clock: passwordsEqual,
  fn: registerFieldsMapper,
  target: viewerModel.register,
});
