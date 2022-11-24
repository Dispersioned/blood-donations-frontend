import { IRoleName } from 'shared/types';

export function canConfirmRequest(role: IRoleName) {
  const roles: IRoleName[] = ['DOCTOR', 'ADMIN'];
  return roles.includes(role);
}
