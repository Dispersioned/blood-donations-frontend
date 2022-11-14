import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchPatients } from 'shared/api';
import { IUser } from 'shared/types';

export const fetch = createEvent();
export const add = createEvent<IUser>();

export const $patients = createStore<IUser[]>([]);
$patients.on(add, (state, payload) => [...state, payload]);

const fetchFx = createEffect(async () => {
  const donations = await fetchPatients();
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
