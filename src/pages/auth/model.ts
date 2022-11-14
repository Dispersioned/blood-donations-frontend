import { createEvent, sample, split } from 'effector';
import { messagerModel } from 'entities/messager';
import { viewerModel } from 'entities/viewer';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { ILoginUserDto, IRegisterEvent } from 'shared/types';

export const login = createEvent<ILoginUserDto>();
export const register = createEvent<IRegisterEvent>();
const registerConfirmed = createEvent<IRegisterEvent>();

sample({
  clock: login,
  target: viewerModel.login,
});

split({
  source: register,
  match: {
    valid: (data) => data.password === data.repeat_password,
  },
  cases: {
    valid: registerConfirmed,
    __: messagerModel.showError.prepend<IRegisterEvent>(() => ({ msg: 'Пароли не совпадают' })),
  },
});

sample({
  clock: registerConfirmed,
  fn: registerFieldsMapper,
  target: viewerModel.register,
});
