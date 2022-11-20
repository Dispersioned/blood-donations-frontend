import { IRoleName } from 'shared/types';

export function canConfirmDonation(role: IRoleName) {
  const roles: IRoleName[] = ['DOCTOR', 'ADMIN'];
  return roles.includes(role);
}
