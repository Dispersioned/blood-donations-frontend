import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchAllHospitals } from 'shared/api';
import { IHospital } from 'shared/types';

export const fetch = createEvent();

const fetchHospitalsFx = createEffect(async () => {
  const hospitals = await fetchAllHospitals();
  return hospitals;
});

export const $hospitals = createStore<IHospital[] | null>(null);
$hospitals.on(fetchHospitalsFx.doneData, (_, payload) => payload);

sample({
  clock: fetch,
  filter: fetchHospitalsFx.pending.map((is) => !is),
  target: fetchHospitalsFx,
});
