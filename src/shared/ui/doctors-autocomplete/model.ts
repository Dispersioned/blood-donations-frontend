import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchDoctors } from 'shared/api';
import { IUser } from 'shared/types';

export const fetch = createEvent();

export const fetchFx = createEffect(async () => {
  const donations = await fetchDoctors();
  return donations;
});

export const $doctors = createStore<IUser[]>([]);
export const $fetched = createStore(false);

$fetched.on(fetchFx.done, () => true);
$fetched.on(fetchFx.fail, () => true);

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $doctors,
});
