import { IBloodGroup, IBloodRhFactor, IRegisterEvent } from 'shared/types';

export function registerFieldsMapper(data: IRegisterEvent) {
  const bloodInfo = data.blood;
  return {
    ...data,
    blood: {
      group: bloodInfo.replace('+', '').replace('-', '') as IBloodGroup,
      rhFactor: bloodInfo.slice(-1) as IBloodRhFactor,
    },
  };
}
