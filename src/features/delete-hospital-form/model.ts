import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { hospitalsModel } from 'pages/hospitals';
import { deleteHospital } from 'shared/api';
import { IDeleteHospitalDto } from 'shared/types';

export const update = createEvent<IDeleteHospitalDto>();

const updateFx = createEffect(async (data: IDeleteHospitalDto) => {
  const result = await deleteHospital(data);
  return result;
});

sample({
  clock: update,
  target: updateFx,
});

updateFx.doneData.watch(async () => {
  await hospitalsModel.fetch();
  messagerModel.showMessage({ type: 'success', msg: 'Больница удалена' });
});
updateFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));
