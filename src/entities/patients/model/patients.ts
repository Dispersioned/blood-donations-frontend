import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchAllPatients } from 'shared/api';
import { IPatient } from 'shared/types';

export const fetch = createEvent();

export const $patients = createStore<IPatient[]>([]);

const fetchFx = createEffect(async () => {
  const donations = await fetchAllPatients();
  return donations;
});

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $patients,
});
