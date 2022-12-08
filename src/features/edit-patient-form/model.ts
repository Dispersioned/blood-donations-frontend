import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { patientsModel } from 'entities/patients';
import { updatePatient } from 'shared/api';
import { IUpdatePatientDto } from 'shared/types';

export const update = createEvent<IUpdatePatientDto>();

const updateFx = createEffect(async (data: IUpdatePatientDto) => {
  const result = await updatePatient(data);
  return result;
});

sample({
  clock: update,
  filter: updateFx.pending.map((is) => !is),
  target: updateFx,
});

updateFx.doneData.watch(async () => {
  await patientsModel.fetch();
  messagerModel.showMessage({ type: 'success', msg: 'Данные пациента изменены' });
});
updateFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));
