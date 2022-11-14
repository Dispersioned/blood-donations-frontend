import { createEffect, createEvent, sample } from 'effector';
import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { registerPatient } from 'shared/api';
import { passwordValidatorFactory } from 'shared/factory/passwordValidatorFactory';
import { bloodMapper } from 'shared/lib/bloodMapper';
import { IRegisterPatientDto, IRegisterPatientEvent } from 'shared/types';

export const register = createEvent<IRegisterPatientEvent>();

const registerFx = createEffect(async (data: IRegisterPatientDto) => {
  const { user } = await registerPatient(data);
  return user;
});

const { passwordsEqual } = passwordValidatorFactory(register);

registerFx.doneData.watch((doctor) => {
  messagerModel.showMessage({ type: 'success', msg: 'Пациент зарегистрирован' });
  doctorsModel.add(doctor);
});
registerFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));

sample({
  clock: passwordsEqual,
  fn: (data) => ({
    ...data,
    blood: bloodMapper(data.blood),
    doctorId: data.doctor.id,
    hospitalId: 0, // TODO not implemented
  }),
  target: registerFx,
});
