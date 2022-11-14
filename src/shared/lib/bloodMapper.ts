import { IBloodGroup, IBloodRhFactor } from 'shared/types';

export function bloodMapper(blood: string) {
  return {
    group: blood.replace('+', '').replace('-', '') as IBloodGroup,
    rhFactor: blood.slice(-1) as IBloodRhFactor,
  };
}
