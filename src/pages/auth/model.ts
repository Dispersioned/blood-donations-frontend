import { createEvent, sample, split } from 'effector';
import { messagerModel } from 'entities/messager';
import { viewerModel } from 'entities/viewer';
import { IBloodGroup, IBloodRhFactor, ILoginUserDto } from 'shared/types';

type IRegisterEvent = {
  username: string;
  password: string;
  repeat_password: string;
  blood: string;
};

export const login = createEvent<ILoginUserDto>();
export const register = createEvent<IRegisterEvent>();
const registerConfirmed = createEvent<IRegisterEvent>();

sample({
  clock: login,
  target: viewerModel.login,
});

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
  target: viewerModel.register,
});
