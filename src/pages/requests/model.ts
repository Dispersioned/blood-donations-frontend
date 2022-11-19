import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchAllRequests } from 'shared/api';
import { IRequest } from 'shared/types';

export const fetch = createEvent();

export const $requests = createStore<IRequest[]>([]);

const fetchFx = createEffect(async () => {
  const requests = await fetchAllRequests();
  return requests;
});

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $requests,
});

$requests.watch(console.log);
