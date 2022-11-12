import { createEffect, createEvent, sample } from 'effector';
import { makeDonation } from 'shared/api';
import { ICreateDonationDto } from 'shared/types';

export const donate = createEvent<ICreateDonationDto>();

const donateFx = createEffect(async (data: ICreateDonationDto) => {
  const donation = await makeDonation(data);
  console.log(donation);
  return donation;
});

sample({
  clock: donate,
  target: donateFx,
});
