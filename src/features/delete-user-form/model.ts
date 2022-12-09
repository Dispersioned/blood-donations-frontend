import { AxiosError } from 'axios';
import { createEffect, createEvent, sample } from 'effector';
import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { patientsModel } from 'entities/patients';
import { deleteDoctor as deleteDoctorApi, deletePatient as deletePatientApi } from 'shared/api';
import { IDeleteUserDto } from 'shared/types';

export const deleteDoctor = createEvent<IDeleteUserDto>();
export const deletePatient = createEvent<IDeleteUserDto>();

const deleteDoctorFx = createEffect(async (data: IDeleteUserDto) => {
  const result = await deleteDoctorApi(data);
  return result;
});

const deletePatientFx = createEffect(async (data: IDeleteUserDto) => {
  const result = await deletePatientApi(data);
  return result;
});

sample({
  clock: deleteDoctor,
  target: deleteDoctorFx,
});

sample({
  clock: deletePatient,
  target: deletePatientFx,
});

deleteDoctorFx.doneData.watch(async () => {
  await doctorsModel.fetch();
  messagerModel.showMessage({ type: 'success', msg: 'Доктор удален' });
});

deletePatientFx.doneData.watch(async () => {
  await patientsModel.fetch();
  messagerModel.showMessage({ type: 'success', msg: 'Пациент удален' });
});
