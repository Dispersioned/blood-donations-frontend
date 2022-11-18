import { IRoleName } from 'shared/types';

export function isPatient(role: IRoleName) {
  const roles: IRoleName[] = ['PATIENT'];
  return roles.includes(role);
}
