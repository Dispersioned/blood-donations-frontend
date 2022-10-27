import { createEffect, createEvent, createStore, sample } from 'effector';
import { getAllHospitals } from 'shared/api';
import { IHospital } from 'shared/types';

export const fetchHospitals = createEvent();

const fetchHospitalsFx = createEffect(async () => {
  const hospitals = await getAllHospitals();
  return hospitals;
});

export const $hospitals = createStore<IHospital[] | null>(null);
$hospitals.on(fetchHospitalsFx.doneData, (_, payload) => payload);

sample({
  clock: fetchHospitals,
  filter: fetchHospitalsFx.pending.map((is) => !is),
  target: fetchHospitalsFx,
});

$hospitals.watch(console.log);
