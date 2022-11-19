import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { makeDonationRequest } from 'shared/api';
import { ICreateRequestDto } from 'shared/types';

export const donate = createEvent<ICreateRequestDto>();

const donateFx = createEffect(async (data: ICreateRequestDto) => {
  const donation = await makeDonationRequest(data);
  return donation;
});

sample({
  clock: donate,
  target: donateFx,
});

donateFx.doneData.watch(() => messagerModel.showMessage({ type: 'success', msg: 'Кровь сдана' }));
donateFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));
