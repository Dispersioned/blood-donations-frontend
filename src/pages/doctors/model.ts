import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchDoctors } from 'shared/api';
import { IUser } from 'shared/types';

export const fetch = createEvent();
export const $doctors = createStore<IUser[]>([]);

const fetchFx = createEffect(async () => {
  const donations = await fetchDoctors();
  return donations;
});

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $doctors,
});
