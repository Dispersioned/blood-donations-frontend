import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { makeDonation } from 'shared/api';
import { ICreateDonationDto } from 'shared/types';

export const donate = createEvent<ICreateDonationDto>();

const donateFx = createEffect(async (data: ICreateDonationDto) => {
  const donation = await makeDonation(data);
  return donation;
});

sample({
  clock: donate,
  target: donateFx,
});

donateFx.doneData.watch(() => messagerModel.showMessage({ type: 'success', msg: 'Кровь сдана' }));
