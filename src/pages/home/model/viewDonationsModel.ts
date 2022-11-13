import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchUserDonations } from 'shared/api';
import { IDonation } from 'shared/types';

type IFetchPayload = {
  userId: number;
};

export const fetch = createEvent<IFetchPayload>();
export const $donations = createStore<IDonation[]>([]);
$donations.watch(console.log);

const fetchFx = createEffect(async ({ userId }: IFetchPayload) => {
  const donations = await fetchUserDonations(userId);
  return donations;
});

sample({
  clock: fetch,
  filter: fetchFx.pending.map((is) => !is),
  target: fetchFx,
});

sample({
  clock: fetchFx.doneData,
  target: $donations,
});
