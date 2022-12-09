import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { patientsModel } from 'entities/patients';
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

registerFx.doneData.watch(() => {
  messagerModel.showMessage({ type: 'success', msg: 'Пациент зарегистрирован' });
  patientsModel.fetch();
});

sample({
  clock: passwordsEqual,
  fn: (data) => ({
    ...data,
    blood: bloodMapper(data.blood),
    hospitalId: data.hospital.id,
    doctorId: data.doctor.id,
  }),
  target: registerFx,
});
