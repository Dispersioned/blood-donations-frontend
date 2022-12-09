import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchAllHospitals } from 'shared/api';
import { IHospital } from 'shared/types';

export const fetch = createEvent();

export const fetchFx = createEffect(async () => {
  const hospitals = await fetchAllHospitals();
  return hospitals;
});

export const $hospitals = createStore<IHospital[]>([]);

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $hospitals,
});
