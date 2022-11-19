import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchPatientInfo } from 'shared/api';
import { IPatient } from 'shared/types';

type IFetchPayload = {
  patientId: number;
};

export const fetch = createEvent<IFetchPayload>();
export const $patient = createStore<IPatient | null>(null);

const fetchFx = createEffect(async ({ patientId }: IFetchPayload) => {
  const patientInfo = await fetchPatientInfo(patientId);
  return patientInfo;
});

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $patient,
});
