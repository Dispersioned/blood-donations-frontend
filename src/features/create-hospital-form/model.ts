import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { hospitalsModel } from 'pages/hospitals';
import { createHospital } from 'shared/api';
import { ICreateHospitalDto } from 'shared/types';

export const create = createEvent<ICreateHospitalDto>();

const createFx = createEffect(async (data: ICreateHospitalDto) => {
  const hospital = await createHospital(data);
  return hospital;
});

sample({
  clock: create,
  target: createFx,
});

createFx.doneData.watch(() => {
  messagerModel.showMessage({ type: 'success', msg: 'Больница создана' });
  hospitalsModel.fetch();
});
