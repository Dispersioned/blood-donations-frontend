import { createEffect, createEvent, sample } from 'effector';
import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { updateDoctor } from 'shared/api';
import { IUpdateDoctorDto } from 'shared/types';

export const update = createEvent<IUpdateDoctorDto>();

const updateFx = createEffect(async (data: IUpdateDoctorDto) => {
  const result = await updateDoctor(data);
  return result;
});

sample({
  clock: update,
  filter: updateFx.pending.map((is) => !is),
  target: updateFx,
});

updateFx.doneData.watch(async () => {
  await doctorsModel.fetch();
  messagerModel.showMessage({ type: 'success', msg: 'Данные доктора изменены' });
});
