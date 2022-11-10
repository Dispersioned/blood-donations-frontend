import { createEvent, sample } from 'effector';
import { viewerModel } from 'entities/viewer';
import { IBloodGroup, IBloodRhFactor, ILoginUserDto } from 'shared/types';

type IRegisterEvent = {
  username: string;
  password: string;
  blood: string;
};

export const login = createEvent<ILoginUserDto>();
export const register = createEvent<IRegisterEvent>();

sample({
  clock: login,
  target: viewerModel.login,
});
sample({
  clock: register,
  fn: (eventData) => {
    const bloodInfo = eventData.blood;
    return {
      ...eventData,
      blood: {
        group: bloodInfo.slice(-1) as IBloodGroup,
        rhFactor: bloodInfo.replace('+', '').replace('-', '') as IBloodRhFactor,
      },
    };
  },
  target: viewerModel.register,
});
