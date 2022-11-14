import { createEffect, createEvent, sample, split } from 'effector';
import { messagerModel } from 'entities/messager';
import { registerDoctor } from 'shared/api';
import { IBloodGroup, IBloodRhFactor, IRegisterEvent, IRegisterUserDto } from 'shared/types';

export const register = createEvent<IRegisterEvent>();
const registerConfirmed = createEvent<IRegisterEvent>();

const registerFx = createEffect(async (data: IRegisterUserDto) => {
  await registerDoctor(data);
});

registerFx.doneData.watch(() => messagerModel.showMessage({ type: 'success', msg: 'Доктор зарегистрирован' }));
registerFx.fail.watch(() => messagerModel.showError({ msg: 'Произошла ошибка' }));

split({
  source: register,
  match: {
    valid: (data) => data.password === data.repeat_password,
  },
  cases: {
    valid: registerConfirmed,
    __: messagerModel.showError.prepend<IRegisterEvent>(() => ({ msg: 'Пароли не совпадают' })),
  },
});

sample({
  clock: registerConfirmed,
  fn: (data) => {
    const bloodInfo = data.blood;
    return {
      ...data,
      blood: {
        group: bloodInfo.replace('+', '').replace('-', '') as IBloodGroup,
        rhFactor: bloodInfo.slice(-1) as IBloodRhFactor,
      },
    };
  },
  target: registerFx,
});
