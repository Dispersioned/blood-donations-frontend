import { createEffect, createEvent, sample } from 'effector';
import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { registerDoctor } from 'shared/api';
import { passwordValidatorFactory } from 'shared/factory/passwordValidatorFactory';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { IRegisterEvent, IRegisterUserDto } from 'shared/types';

export const register = createEvent<IRegisterEvent>();

const registerFx = createEffect(async (data: IRegisterUserDto) => {
  const { user } = await registerDoctor(data);
  return user;
});

const { passwordsEqual } = passwordValidatorFactory(register);

registerFx.doneData.watch((doctor) => {
  messagerModel.showMessage({ type: 'success', msg: 'Доктор зарегистрирован' });
  doctorsModel.add(doctor);
});
registerFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));

sample({
  clock: passwordsEqual,
  fn: registerFieldsMapper,
  target: registerFx,
});
