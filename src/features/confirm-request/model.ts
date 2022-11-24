import { createEffect, createEvent, sample } from 'effector';
import { messagerModel } from 'entities/messager';
import { requestsModel } from 'entities/requests';
import { confirmRequest } from 'shared/api';
import { IConfirmRequestDto } from 'shared/types';

export const confirm = createEvent<IConfirmRequestDto>();

const confirmFx = createEffect(async (data: IConfirmRequestDto) => {
  const result = await confirmRequest(data);
  return result;
});

sample({
  clock: confirm,
  target: confirmFx,
});

confirmFx.doneData.watch(() => messagerModel.showMessage({ type: 'success', msg: 'Запрос создан' }));
confirmFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));

sample({
  clock: confirmFx.doneData,
  target: requestsModel.fetch,
});
