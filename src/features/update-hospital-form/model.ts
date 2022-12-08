import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { hospitalsModel } from 'pages/hospitals';
import { updateHospital } from 'shared/api';
import { IUpdateHospitalDto } from 'shared/types';

export const update = createEvent<IUpdateHospitalDto>();

const updateFx = createEffect(async (data: IUpdateHospitalDto) => {
  const hospital = await updateHospital(data);
  return hospital;
});

sample({
  clock: update,
  target: updateFx,
});

updateFx.doneData.watch(async () => {
  await hospitalsModel.fetch();
  messagerModel.showMessage({ type: 'success', msg: 'Больница создана' });
});
updateFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));
